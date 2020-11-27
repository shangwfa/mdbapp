package com.mdbapp.module;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import com.mdbapp.utils.ETBitMapUtils;
import com.mdbapp.utils.ReactImage.ResponseHelper;
import com.megvii.livenesslib.LivenessActivity;

import org.json.JSONObject;

import static android.app.Activity.RESULT_OK;

public class ETFaceIDlivenessModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext mContext;
    private Promise mPromise;
    private static final int PAGE_INTO_LIVENESS = 100;
    private ResponseHelper responseHelper = new ResponseHelper();

    public ETFaceIDlivenessModule(ReactApplicationContext context){
        super(context);
        mContext=context;
        mContext.addActivityEventListener(faceliveActivityEventListener);
    }
    @Override
    public String getName() {
        return "ETFaceIDlivenessModule";
    }

    @ReactMethod
    public void onPressFaceLiveness(final ReadableMap options, final Promise promise) {
        this.mPromise = promise;
        //Log.i("onPressFace", "onPressFaceLiveness");
        if (getReactApplicationContext().getCurrentActivity() == null) {
            mPromise.reject("E_ACTIVITY_DOES_NOT_EXIST", "onPressFaceLiveness Activity doesn't exist");
            return;
        }
        try{
            Intent livenessIntent = new Intent(getReactApplicationContext(), LivenessActivity.class);
            if(options.hasKey("langCode")){
                livenessIntent.putExtra("langCode", options.getString("langCode"));
            }
            /*getReactApplicationContext().getCurrentActivity().startActivityForResult(new Intent(getReactApplicationContext(), LivenessActivity.class),
                    PAGE_INTO_LIVENESS);*/
            getReactApplicationContext().getCurrentActivity().startActivityForResult(livenessIntent, PAGE_INTO_LIVENESS);

        }catch (Exception e){
            mPromise.reject("START_ACTIVITY_ERROR", "" + "START_ACTIVITY_ERROR:"+e);
            mPromise=null;
        }
        //mPromise.resolve("onPressFace");
        //Log.i("recogResultHelper", recogResultHelper.getResponse().toString());
        //mPromise.resolve(recogResultHelper.getResponse()); //返回数据给reactNative
       // recogResultHelper.cleanResponse(); //清除responseHelper数据，否则下一次putString 一样的key 会出错
    }
    /**You will receive this call immediately before onResume() when your activity is re-starting.**/
    private final ActivityEventListener faceliveActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            super.onActivityResult(requestCode, resultCode, data);
            if (requestCode == PAGE_INTO_LIVENESS && resultCode == RESULT_OK) {
                String result = data.getStringExtra("result");
                //ResultActivity.startActivity(this, result);
                //将byte[]类型转换成Bitmap类型
                byte[] imgEnv = data.getByteArrayExtra("image_env");
                byte[] imgBest = data.getByteArrayExtra("image_best");
                Bitmap bitmapEnv = BitmapFactory.decodeByteArray(imgEnv, 0, imgEnv.length);
                Bitmap bitmapBest = BitmapFactory.decodeByteArray(imgBest, 0, imgBest.length);
                //轉爲base64格式發到RN端到後端,bitmapBest可以作對比，bitmapEnv可以做FMP
                String imageBestBase64 = ETBitMapUtils.bitmapToBase64(bitmapBest);
                String imageEnvBase64 = ETBitMapUtils.bitmapToBase64(bitmapEnv);
                String resultText="",resultCodeText="";
                try {
                    JSONObject resultJson = new JSONObject(result); //轉為JSON對象
                    resultText = resultJson.getString("result");
                    resultCodeText = resultJson.getString("resultCode");
                }catch (Exception e){
                    mPromise.reject("START_JSONObject_ERROR", "" + "JSONObject:"+e);
                    mPromise=null;
                }
                Log.i("faceliveresult", "============================================");
                Log.i("faceliveresult",resultText);
                Log.i("faceliveresult",resultCodeText);
                Log.i("faceliveresult", "============================================");
                if("success".equals(resultCodeText)){
                    responseHelper.putString("result",resultText);
                    responseHelper.putString("resultCode",resultCodeText);
                    responseHelper.putString("imageBestBase64",imageBestBase64);
                    responseHelper.putString("imageEnvBase64",imageEnvBase64);
                    mPromise.resolve(responseHelper.getResponse()); //返回数据给reactNative
                    responseHelper.cleanResponse(); //清除responseHelper数据，否则下一次putString 一样的key 会出错
                }else if("fail".equals(resultCodeText)){
                    responseHelper.putString("result",resultText);
                    responseHelper.putString("resultCode",resultCodeText);
                    mPromise.reject("result",resultText);
                    responseHelper.cleanResponse(); //清除responseHelper数据，否则下一次putString 一样的key 会出错
                }else{
                    responseHelper.putString("result","Unexpected error");
                    responseHelper.putString("resultCode","Unexpected error");
                    mPromise.reject("result","Unexpected error");
                    responseHelper.cleanResponse(); //清除responseHelper数据，否则下一次putString 一样的key 会出错
                }

            }
            //super.onActivityResult(requestCode, resultCode, data);
        }
    };

}
