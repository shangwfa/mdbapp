package com.mdbapp.module;

import android.Manifest;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.provider.MediaStore;
import android.text.TextUtils;
import android.util.Base64;
import android.util.Log;
import android.util.Patterns;
import android.webkit.MimeTypeMap;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.kernal.passportreader.sdk.utils.CheckPermission;
import com.kernal.passportreader.sdk.utils.PermissionActivity;

import com.mdbapp.utils.ReactImage.ImageConfig;
import com.mdbapp.utils.ReactImage.MediaUtils;
import com.mdbapp.utils.ReactImage.RealPathUtil;
import com.mdbapp.utils.ReactImage.ResponseHelper;
import com.megvii.livenesslib.takeImageCert.CameraActivity;
import com.tbruyelle.rxpermissions3.RxPermissions;
import com.yanzhenjie.permission.AndPermission;
import com.yanzhenjie.permission.runtime.Permission;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import static com.kernal.passportreader.sdk.utils.PermissionActivity.PERMISSIONPICKER;
import static com.mdbapp.utils.ReactImage.MediaUtils.createNewFile;
import static com.mdbapp.utils.ReactImage.MediaUtils.fileScan;
import static com.mdbapp.utils.ReactImage.MediaUtils.getResizedImage;
import static com.mdbapp.utils.ReactImage.MediaUtils.readExifInterface;
import static com.mdbapp.utils.ReactImage.MediaUtils.removeUselessFiles;


//import com.megvii.livenesslib.takeImage.CameraActivity;

public class ETImagePickerModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext mContext;
    private Promise mPromise;
    private ResponseHelper responseHelper = new ResponseHelper();

    public static final int REQUEST_LAUNCH_IMAGE_CAPTURE    = 13001;
    public static final int REQUEST_LAUNCH_IMAGE_LIBRARY    = 13002;
    public static final int REQUEST_LAUNCH_VIDEO_LIBRARY    = 13003;
    public static final int REQUEST_LAUNCH_VIDEO_CAPTURE    = 13004;
    public static final int REQUEST_PERMISSIONS_FOR_CAMERA  = 14001;
    public static final int REQUEST_PERMISSIONS_FOR_LIBRARY = 14002;
    private ReadableMap options;
    private Boolean noData = false;
    private Boolean pickVideo = false;
    protected Uri cameraCaptureURI;
    @Deprecated
    private int videoQuality = 1;
    @Deprecated
    private int videoDurationLimit = 0;

    private int sortOperaPermission=0;
    private int sortOperaTakePermission=0;
    private ImageConfig imageConfig = new ImageConfig(null, null, 0, 0, 100, 0, false);

    public ETImagePickerModule(ReactApplicationContext context) {
        super(context);
        mContext = context;
        mContext.addActivityEventListener(imagePickerActivityEventListener);
    }

    @Override
    public String getName() {
        return "ETImagePickerModule";
    }

    @ReactMethod
    public void showImagePicker(final ReadableMap options, final Promise promise) {
        this.mPromise = promise;
        Activity currentActivity = getReactApplicationContext().getCurrentActivity();
        if (currentActivity == null) {
            mPromise.reject("E_ACTIVITY_DOES_NOT_EXIST", "ETImagePickerModule Activity doesn't exist");
            return;
        }
        this.options = options;
        imageConfig = new ImageConfig(null, null, 0, 0, 100, 0, false);

        try{
            sortOperaPermission=0;
            // reactnative : getApplicationContext() =>getReactApplicationContext()
            //Intent intent = new Intent(getReactApplicationContext(), CardsCameraActivity.class);
            if (Build.VERSION.SDK_INT >= 23) {
                CheckPermission checkPermission = new CheckPermission(getReactApplicationContext());
                if (checkPermission.permissionSet(PERMISSIONPICKER)) {
                    PermissionActivity.startActivityForImagePickerResult(getReactApplicationContext().getCurrentActivity(),sortOperaHandler, 0, PERMISSIONPICKER);
                    //this.launchImageLibrary();
                } else {
                    this.launchImageLibrary();
                }
            } else {
                this.launchImageLibrary();
            }
            //startActivityForResult(intent, PHOTO_WITH_CAMERA);
            //reactnative startActivityForResult
            //getReactApplicationContext().getCurrentActivity().startActivityForResult(intent, PHOTO_WITH_CAMERA);

        }catch (Exception e){
            mPromise.reject("launchImageLibrary_ERROR", "" + "launchImageLibrary_ERROR:"+e);
            mPromise=null;
        }
       // this.launchImageLibrary();
    }
    @ReactMethod
    public void takeImagePicker(final ReadableMap options, final Promise promise) {

        this.mPromise = promise;
        Activity currentActivity = getReactApplicationContext().getCurrentActivity();
        if (currentActivity == null) {
            mPromise.reject("E_ACTIVITY_DOES_NOT_EXIST", "ETImagePickerModule Activity doesn't exist");
            return;
        }
        this.options = options;
        imageConfig = new ImageConfig(null, null, 0, 0, 100, 0, false);

        try{
            sortOperaTakePermission=0;

            if (Build.VERSION.SDK_INT >= 23) {
                CheckPermission checkPermission = new CheckPermission(getReactApplicationContext());
                if (checkPermission.permissionSet(PERMISSIONPICKER)) {
                    PermissionActivity.startActivityForImagePickerResult(getReactApplicationContext().getCurrentActivity(),sortOperaHandlerTake, 0, PERMISSIONPICKER);
                } else {
                    this.launchTakeImageLibrary();
                }
            } else {
                this.launchTakeImageLibrary();
            }

        }catch (Exception e){
            mPromise.reject("launchImageLibrary_ERROR", "" + "launchImageLibrary_ERROR:"+e);
            mPromise=null;
        }
    }
    private Handler sortOperaHandler = new Handler(Looper.getMainLooper()) {
        @Override
        public void handleMessage(Message msg) {
            if(sortOperaPermission==0)
            {
                launchImageLibrary();
            }
        }
    };
    private Handler sortOperaHandlerTake = new Handler(Looper.getMainLooper()) {
        @Override
        public void handleMessage(Message msg) {
            if(sortOperaTakePermission==0)
            {
                launchTakeImageLibrary();
            }
        }
    };
    public void launchTakeImageLibrary()
    {
        this.launchCamera(this.options, this.mPromise);
    }
    public void launchImageLibrary()
    {
        this.launchImageLibrary(this.options, this.mPromise);
    }
    @ReactMethod
    public void launchCamera(final ReadableMap options, final Promise promise)
    {
        this.mPromise = promise;
        if (!isCameraAvailable())
        {
            //responseHelper.invokeError(callback, "Camera not available");
            this.mPromise.reject("E_PROMISE_REJECT_PHOTO_ERROR", "Camera not available");
            return;
        }

        final Activity currentActivity = getReactApplicationContext().getCurrentActivity();
        if (currentActivity == null)
        {
            //responseHelper.invokeError(callback, "can't find current Activity");
            this.mPromise.reject("E_PROMISE_REJECT_PHOTO_ERROR", "can't find current Activity");
            return;
        }
        this.options = options;
        parseOptions(this.options);
        int requestCode;
        Intent cameraIntent;
        if (pickVideo)
        {
            requestCode = REQUEST_LAUNCH_VIDEO_CAPTURE;
            cameraIntent = new Intent(MediaStore.ACTION_VIDEO_CAPTURE);
            cameraIntent.putExtra(MediaStore.EXTRA_VIDEO_QUALITY, videoQuality);
            if (videoDurationLimit > 0)
            {
                cameraIntent.putExtra(MediaStore.EXTRA_DURATION_LIMIT, videoDurationLimit);
            }
        }
        else
        {
            requestCode = REQUEST_LAUNCH_IMAGE_CAPTURE;
            //調系統相機
            //cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
            //調自定義相機
            cameraIntent = new Intent(getReactApplicationContext(), CameraActivity.class);

            final File original = createNewFile(mContext, this.options, false);
            imageConfig = imageConfig.withOriginalFile(original);
            if(options.hasKey("titleTips1")){
                cameraIntent.putExtra("titleTips1", options.getString("titleTips1"));
            }
            if(options.hasKey("titleTips2")){
                cameraIntent.putExtra("titleTips2", options.getString("titleTips2"));
            }
            if(options.hasKey("reTakePhotoButtonTitle")){
                cameraIntent.putExtra("reTakePhotoButtonTitle", options.getString("reTakePhotoButtonTitle"));
            }
            if(options.hasKey("takePhotoButtonTitle")){
                cameraIntent.putExtra("takePhotoButtonTitle", options.getString("takePhotoButtonTitle"));
            }
            if(options.hasKey("cancelButtonTitle")){
                cameraIntent.putExtra("cancelButtonTitle", options.getString("cancelButtonTitle"));
            }
            if (imageConfig.original != null) {
                Log.i("imageConfig:",""+imageConfig.original.getAbsolutePath());
                cameraIntent.putExtra("realPath", imageConfig.original.getAbsolutePath());
                cameraIntent.putExtra("type", 1);
                cameraCaptureURI = RealPathUtil.compatUriFromFile(mContext, imageConfig.original);
            }else {
                //responseHelper.invokeError(callback, "Couldn't get file path for photo");
                this.mPromise.reject("E_PROMISE_REJECT_PHOTO_ERROR", "Couldn't get file path for photo");
                return;
            }
            if (cameraCaptureURI == null)
            {
                //responseHelper.invokeError(callback, "Couldn't get file path for photo");
                this.mPromise.reject("E_PROMISE_REJECT_PHOTO_ERROR", "Couldn't get file path for photo");
                return;
            }
            cameraIntent.putExtra(MediaStore.EXTRA_OUTPUT, cameraCaptureURI);
            //String realPath = getRealPathFromURI(cameraCaptureURI);

        }

        if (cameraIntent.resolveActivity(mContext.getPackageManager()) == null)
        {
            //responseHelper.invokeError(callback, "Cannot launch camera");
            this.mPromise.reject("E_PROMISE_REJECT_PHOTO_ERROR", "Cannot launch camera");
            return;
        }

        // Workaround for Android bug.
        // grantUriPermission also needed for KITKAT,
        // see https://code.google.com/p/android/issues/detail?id=76683
        if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.KITKAT) {
            List<ResolveInfo> resInfoList = mContext.getPackageManager().queryIntentActivities(cameraIntent, PackageManager.MATCH_DEFAULT_ONLY);
            for (ResolveInfo resolveInfo : resInfoList) {
                String packageName = resolveInfo.activityInfo.packageName;
                mContext.grantUriPermission(packageName, cameraCaptureURI, Intent.FLAG_GRANT_WRITE_URI_PERMISSION | Intent.FLAG_GRANT_READ_URI_PERMISSION);
            }
        }

        try
        {
            currentActivity.startActivityForResult(cameraIntent, requestCode);
        }
        catch (ActivityNotFoundException e)
        {
            e.printStackTrace();
            //responseHelper.invokeError(callback, "Cannot launch camera");
            this.mPromise.reject("E_PROMISE_REJECT_PHOTO_ERROR", "Cannot launch camera");
        }
    }

    // NOTE: Currently not reentrant / doesn't support concurrent requests
    @ReactMethod
    public void launchImageLibrary(final ReadableMap options, final Promise promise) {
        final Activity currentActivity = getReactApplicationContext().getCurrentActivity();
        this.mPromise = promise;
        if (currentActivity == null) {
            this.mPromise.reject("E_ACTIVITY_DOES_NOT_EXIST", "launchImageLibrary Activity doesn't exist");
            return;
        }
        parseOptions(this.options);
        int requestCode;
        Intent libraryIntent;
        requestCode = REQUEST_LAUNCH_IMAGE_LIBRARY;
        libraryIntent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        libraryIntent.setType("image/*");
        /*libraryIntent = new Intent(Intent.ACTION_PICK, null);
        libraryIntent.setDataAndType(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, "image/*");*/
        if (libraryIntent.resolveActivity(getReactApplicationContext().getPackageManager()) == null)
        {
            this.mPromise.reject("E_PROMISE_REJECT_PHOTO_LIBRARY_ERROR", "Cannot launch photo library");
            return;
        }
        try
        {
            currentActivity.startActivityForResult(libraryIntent, requestCode);
        }
        catch (ActivityNotFoundException e)
        {
            e.printStackTrace();
            this.mPromise.reject("E_PROMISE_REJECT_PHOTO_LIBRARY_ERROR", "Cannot launch photo library");
        }
    }
    private final ActivityEventListener imagePickerActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            super.onActivityResult(requestCode, resultCode, data);
            Log.i("onActivityResult:",""+requestCode);
            Log.i("onActivityResult:",""+resultCode);
            //Log.i("onActivityResult:",""+data.getData());
            if (passResult(requestCode))
            {
                return;
            }
            responseHelper.cleanResponse();
            Uri uri = null;
            // user cancel
            if (resultCode != Activity.RESULT_OK)
            {
                removeUselessFiles(requestCode, imageConfig);
                mPromise.reject("E_PROMISE_REJECT_PHOTO_LIBRARY_ERROR", "User cancel picker photo");
                mPromise = null;
                return;
            }
            switch (requestCode)
            {
                case REQUEST_LAUNCH_IMAGE_CAPTURE:
                    uri = cameraCaptureURI;
                    break;
                case REQUEST_LAUNCH_IMAGE_LIBRARY:
                    uri = data.getData();
                    String realPath = getRealPathFromURI(uri);
                    final boolean isUrl = !TextUtils.isEmpty(realPath) &&
                            Patterns.WEB_URL.matcher(realPath).matches();
                    if (realPath == null || isUrl)
                    {
                        try
                        {
                            File file = createFileFromURI(uri);
                            realPath = file.getAbsolutePath();
                            uri = Uri.fromFile(file);
                        }
                        catch (Exception e)
                        {
                            // image not in cache
                            responseHelper.putString("error", "Could not read photo");
                            responseHelper.putString("uri", uri.toString());
                            mPromise.reject("E_PROMISE_REJECT_PHOTO_LIBRARY_ERROR", "Could not read photo uri");
                            mPromise = null;
                            return;
                        }
                    }
                    imageConfig = imageConfig.withOriginalFile(new File(realPath));
                    break;
            }
            final MediaUtils.ReadExifResult result = readExifInterface(responseHelper, imageConfig);
            if (result.error != null)
            {
                removeUselessFiles(requestCode, imageConfig);
                //responseHelper.invokeError(callback, result.error.getMessage());
                mPromise.reject("E_PROMISE_REJECT_PHOTO_LIBRARY_ERROR", result.error.getMessage());
                mPromise = null;
                return;
            }

            BitmapFactory.Options Boptions = new BitmapFactory.Options();
            Boptions.inJustDecodeBounds = true;
            BitmapFactory.decodeFile(imageConfig.original.getAbsolutePath(), Boptions);
            int initialWidth = Boptions.outWidth;
            int initialHeight = Boptions.outHeight;
            updatedResultResponse(uri, imageConfig.original.getAbsolutePath());
            // don't create a new file if contraint are respected
            if (imageConfig.useOriginal(initialWidth, initialHeight, result.currentRotation))
            {
                responseHelper.putInt("width", initialWidth);
                responseHelper.putInt("height", initialHeight);
                fileScan(mContext, imageConfig.original.getAbsolutePath());
            }
            else
            {
                imageConfig = getResizedImage(mContext, options, imageConfig, initialWidth, initialHeight, requestCode);
                if (imageConfig.resized == null)
                {
                    removeUselessFiles(requestCode, imageConfig);
                    responseHelper.putString("error", "Can't resize the image");
                }
                else
                {
                    uri = Uri.fromFile(imageConfig.resized);
                    BitmapFactory.decodeFile(imageConfig.resized.getAbsolutePath(), Boptions);
                    responseHelper.putInt("width", Boptions.outWidth);
                    responseHelper.putInt("height", Boptions.outHeight);

                    updatedResultResponse(uri, imageConfig.resized.getAbsolutePath());
                    fileScan(mContext, imageConfig.resized.getAbsolutePath());
                }
            }

            mPromise.resolve(responseHelper.getResponse()); //返回数据给reactNative
            responseHelper.cleanResponse();
            //responseHelper.invokeResponse(callback);
            //删除保存照片
            //ImageTools.deletePhotoAtPath(imageConfig.original.getAbsolutePath());
            mPromise = null;
            options = null;
        }
    };
    private void updatedResultResponse(@Nullable final Uri uri, @NonNull final String path)
    {
        responseHelper.putString("uri", uri.toString());
        responseHelper.putString("path", path);

        if (!noData) {
            responseHelper.putString("data", getSmallBase64StringFromFile(path));
        }
        putExtraFileInfo(path, responseHelper);
    }
    private void putExtraFileInfo(@NonNull final String path,
                                  @NonNull final ResponseHelper responseHelper)
    {
        // size && filename
        try {
            File f = new File(path);
            responseHelper.putDouble("fileSize", f.length());
            responseHelper.putString("fileName", f.getName());
        } catch (Exception e) {
            e.printStackTrace();
        }

        // type
        String extension = MimeTypeMap.getFileExtensionFromUrl(path);
        if (extension != null) {
            responseHelper.putString("type", MimeTypeMap.getSingleton().getMimeTypeFromExtension(extension));
        }
    }
    private boolean isCameraAvailable() {
        return mContext.getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA)
                || mContext.getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA_ANY);
    }
    //计算图片的缩放值
    private  int calculateInSampleSize(BitmapFactory.Options options,int reqWidth, int reqHeight) {
        final int height = options.outHeight;
        final int width = options.outWidth;
        int inSampleSize = 1;

        if (height > reqHeight || width > reqWidth) {
            final int heightRatio = Math.round((float) height/ (float) reqHeight);
            final int widthRatio = Math.round((float) width / (float) reqWidth);
            inSampleSize = heightRatio < widthRatio ? heightRatio : widthRatio;
        }
        return inSampleSize;
    }
    // 根据路径获得图片并压缩，返回bitmap用于显示
    private  Bitmap getSmallBitmap(String filePath) {
        final BitmapFactory.Options options = new BitmapFactory.Options();
        options.inJustDecodeBounds = true;
        BitmapFactory.decodeFile(filePath, options);

        // Calculate inSampleSize
        options.inSampleSize = calculateInSampleSize(options, 800, 480);
        // Decode bitmap with inSampleSize set
        options.inJustDecodeBounds = false;

        return BitmapFactory.decodeFile(filePath, options);
    }

    private String getSmallBase64StringFromFile(String absoluteFilePath) {
        Bitmap bm = getSmallBitmap(absoluteFilePath);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        if(bm.getByteCount()>0 && bm.getByteCount()<250*1024){
            bm.compress(Bitmap.CompressFormat.JPEG, 100, baos);
        }else if(bm.getByteCount()>250*1024 && bm.getByteCount()<500*1024){
            bm.compress(Bitmap.CompressFormat.JPEG, 70, baos);
        }else if(bm.getByteCount()>500*1024 && bm.getByteCount()<1024*1024){
            bm.compress(Bitmap.CompressFormat.JPEG, 60, baos);
        }else if(bm.getByteCount()>1024*1024 && bm.getByteCount()<1524*1024){
            bm.compress(Bitmap.CompressFormat.JPEG, 50, baos);
        }else if(bm.getByteCount()>1524*1024 && bm.getByteCount()<2048*1024){
            bm.compress(Bitmap.CompressFormat.JPEG, 40, baos);
        }else if(bm.getByteCount()>2048*1024 && bm.getByteCount()<2548*1024){
            bm.compress(Bitmap.CompressFormat.JPEG, 35, baos);
        }else if(bm.getByteCount()>2548*1024 && bm.getByteCount()<3072*1024){
            bm.compress(Bitmap.CompressFormat.JPEG, 30, baos);
        }else{
            bm.compress(Bitmap.CompressFormat.JPEG, 30, baos);
        }

        //bm.compress(Bitmap.CompressFormat.JPEG, 100, baos);
        byte[] b = baos.toByteArray();
        return Base64.encodeToString(b, Base64.NO_WRAP);

    }

    private String getBase64StringFromFile(String absoluteFilePath) {
        InputStream inputStream = null;
        try {
            inputStream = new FileInputStream(new File(absoluteFilePath));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        byte[] bytes;
        byte[] buffer = new byte[8192];
        int bytesRead;
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        try {
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                output.write(buffer, 0, bytesRead);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        bytes = output.toByteArray();
        return Base64.encodeToString(bytes, Base64.NO_WRAP);
    }
    /**
     * Create a file from uri to allow image picking of image in disk cache
     * (Exemple: facebook image, google image etc..)
     *
     * @doc =>
     * https://github.com/nostra13/Android-Universal-Image-Loader#load--display-task-flow
     *
     * @param uri
     * @return File
     * @throwsException
     */
    private File createFileFromURI(Uri uri) throws Exception {
        File file = new File(mContext.getExternalCacheDir(), "photo-" + uri.getLastPathSegment());
        InputStream input = mContext.getContentResolver().openInputStream(uri);
        OutputStream output = new FileOutputStream(file);

        try {
            byte[] buffer = new byte[4 * 1024];
            int read;
            while ((read = input.read(buffer)) != -1) {
                output.write(buffer, 0, read);
            }
            output.flush();
        } finally {
            output.close();
            input.close();
        }

        return file;
    }
    private @NonNull String getRealPathFromURI(@NonNull final Uri uri) {
        return RealPathUtil.getRealPathFromURI(mContext, uri);
    }
    private boolean passResult(int requestCode)
    {
        return mPromise == null || (cameraCaptureURI == null && requestCode == REQUEST_LAUNCH_IMAGE_CAPTURE)
                || (requestCode != REQUEST_LAUNCH_IMAGE_CAPTURE && requestCode != REQUEST_LAUNCH_IMAGE_LIBRARY
                && requestCode != REQUEST_LAUNCH_VIDEO_LIBRARY && requestCode != REQUEST_LAUNCH_VIDEO_CAPTURE);
    }
    private void parseOptions(final ReadableMap options) {
        noData = false;
        if (options.hasKey("noData")) {
            noData = options.getBoolean("noData");
        }
        imageConfig = imageConfig.updateFromOptions(options);
        pickVideo = false;
        if (options.hasKey("mediaType") && options.getString("mediaType").equals("video")) {
            pickVideo = true;
        }
        videoQuality = 1;
        if (options.hasKey("videoQuality") && options.getString("videoQuality").equals("low")) {
            videoQuality = 0;
        }
        videoDurationLimit = 0;
        if (options.hasKey("durationLimit")) {
            videoDurationLimit = options.getInt("durationLimit");
        }
    }

}
