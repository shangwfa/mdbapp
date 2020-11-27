package com.mdbapp.utils;

//import android.util.Log;

import android.util.Log;


import com.mdbapp.authenticator.Base32String;
import com.mdbapp.authenticator.OtpSource;
import com.mdbapp.authenticator.OtpSourceException;
import com.mdbapp.authenticator.PasscodeGenerator;
import com.mdbapp.authenticator.TotpClock;
import com.mdbapp.authenticator.TotpCounter;
import com.mdbapp.authenticator.Utilities;
import com.mdbapp.authenticator.PasscodeGenerator.Signer;

import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Collection;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

/**
 * Class containing implementation of HOTP/TOTP.
 * Generates OTP codes for one or more accounts.
 * @author Steve Weis (sweis@google.com)
 * @author Cem Paya (cemp@google.com)
 */
public class ETOtpProvider implements OtpSource {

    private static final String LOCAL_TAG = "ETOtpProvider";

    public static void main(String[] args){
        try {
            ETOtpProvider etOtpProvider = new ETOtpProvider();
            for( int i = 0; i < 10; i ++) {
                System.out.println("auth code :[" + etOtpProvider.getNextAuthCode("testname", "erefdsafdaieeafdfd") + "]");
                Thread.sleep(30000);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    /**
     * Types of secret keys.
     */
    public enum OtpType {
        TOTP (0),  // time based
        HOTP (1);  // counter based

        public final Integer value;
        OtpType(Integer value) {
            this.value = value;
        }

        public static OtpType getEnum(Integer i) {
            for (OtpType type : OtpType.values()) {
                if (type.value.equals(i)) {
                    return type;
                }
            }

            return null;
        }

    }

    private static final int PIN_LENGTH = 6; // HOTP or TOTP
    private static final int REFLECTIVE_PIN_LENGTH = 9; // ROTP

    private java.util.List<String> accountList;

    @Override
    public int enumerateAccounts(Collection<String> result) {
        if(accountList == null){
            return 0;
        }
        if(accountList.size() <=0 ){
            return 0;
        }
        for(int i = 0; i<accountList.size(); i++){
            result.add(accountList.get(i));
        }
        return accountList.size();
    }

    @Override
    public String getNextCode(String accountName) throws OtpSourceException {
        String secret = "88888888888888";
        return getCurrentCode(accountName, secret, null);
    }

    public String getNextAuthCode(String accountName, String secret) throws OtpSourceException {
        return getCurrentCode(accountName, secret, null);
    }

    // This variant is used when an additional challenge, such as URL or
    // transaction details, are included in the OTP request.
    // The additional string is appended to standard HOTP/TOTP state before
    // applying the MAC function.
    @Override
    public String respondToChallenge(String accountName, String challenge) throws OtpSourceException {
        if (challenge == null) {
            return getCurrentCode(accountName, null, null);
        }
        try {
            byte[] challengeBytes = challenge.getBytes("UTF-8");
            return getCurrentCode(accountName, null, challengeBytes);
        } catch (UnsupportedEncodingException e) {
            return "";
        }
    }

    @Override
    public TotpCounter getTotpCounter() {
        return mTotpCounter;
    }

    @Override
    public TotpClock getTotpClock() {
        return mTotpClock;
    }

    private String getCurrentCode(String username, String secret, byte[] challenge) throws OtpSourceException {
//        if (username == null) {
//            throw new OtpSourceException("No account name");
//        }
        OtpType type = OtpType.getEnum(0);
        long otp_state = 0;

        if (type == OtpType.TOTP) {
            // For time-based OTP, the state is derived from clock.
            long currentTime = System.currentTimeMillis();
            //otp_state = mTotpCounter.getValueAtTime(Utilities.millisToSeconds(mTotpClock.currentTimeMillis()));
            otp_state = Utilities.millisToSeconds(currentTime)/30l;
        }
        return computePin(secret, otp_state, challenge);
    }

    public ETOtpProvider(){
        this(DEFAULT_INTERVAL, null);
    }
    public ETOtpProvider(TotpClock totpClock) {
        this(DEFAULT_INTERVAL, totpClock);
    }

    public ETOtpProvider(int interval, TotpClock totpClock) {
        mTotpCounter = new TotpCounter(interval);
        mTotpClock = totpClock;
    }

    /**
     * Computes the one-time PIN given the secret key.
     *
     * @param secret the secret key
     * @param otp_state current token state (counter or time-interval)
     * @param challenge optional challenge bytes to include when computing passcode.
     * @return the PIN
     */
    private String computePin(String secret, long otp_state, byte[] challenge)
            throws OtpSourceException {
        if (secret == null || secret.length() == 0) {
            throw new OtpSourceException("Null or empty secret");
        }

        try {
            Signer signer = ETOtpProvider.getSigningOracle(secret);
            PasscodeGenerator pcg = new PasscodeGenerator(signer,
                    (challenge == null) ? PIN_LENGTH : REFLECTIVE_PIN_LENGTH);

            return (challenge == null) ?
                    pcg.generateResponseCode(otp_state) :
                    pcg.generateResponseCode(otp_state, challenge);
        } catch (GeneralSecurityException e) {
            throw new OtpSourceException("Crypto failure", e);
        }
    }

    static Signer getSigningOracle(String secret) {
        try {
            byte[] keyBytes = decodeKey(secret);
            final Mac mac = Mac.getInstance("HMACSHA1");
            mac.init(new SecretKeySpec(keyBytes, ""));

            // Create a signer object out of the standard Java MAC implementation.
            return new Signer() {
                @Override
                public byte[] sign(byte[] data) {
                    return mac.doFinal(data);
                }
            };
        } catch (Base32String.DecodingException error) {
            Log.e(LOCAL_TAG, error.getMessage());
        } catch (NoSuchAlgorithmException error) {
            Log.e(LOCAL_TAG, error.getMessage());
        } catch (InvalidKeyException error) {
            Log.e(LOCAL_TAG, error.getMessage());
        }
        return null;
    }

    private static byte[] decodeKey(String secret) throws Base32String.DecodingException {
        return Base32String.decode(secret);
    }

    /** Default passcode timeout period (in seconds) */
    public static final int DEFAULT_INTERVAL = 30;

    /** Clock input for time-based OTPs (TOTP). */
    private final TotpClock mTotpClock;

    /** Counter for time-based OTPs (TOTP). */
    private final TotpCounter mTotpCounter;
}
