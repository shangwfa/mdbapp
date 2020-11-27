package com.megvii.livenesslib.takeImage;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.PixelFormat;
import android.graphics.Point;
import android.graphics.SurfaceTexture;
import android.hardware.Camera;
import android.hardware.Camera.PictureCallback;
import android.hardware.Camera.ShutterCallback;
import android.hardware.Camera.Size;
import android.util.Log;
import android.view.SurfaceHolder;

import com.megvii.livenesslib.takeImage.util.CamParaUtil;
import com.megvii.livenesslib.takeImage.util.FileUtil;
import com.megvii.livenesslib.takeImage.util.ImageUtil;

import java.io.IOException;
import java.util.List;

public class CameraInterface {
	private static final String TAG = "YanZi";
	private Camera mCamera;
	private Camera.Parameters mParams;
	private boolean isPreviewing = false;
	private float mPreviwRate = -1f;
	private static CameraInterface mCameraInterface;
	private CamOpenOverCallback takePicture ;
	private String returnPath;
	private int BarHeight;
	private boolean hasScreen;
	public interface CamOpenOverCallback{
		public void cameraHasOpened();
		public void onPictureOver(String code,String msg);
		public void onPictureStepOne();
	}



	private CameraInterface(){

	}
	public static synchronized CameraInterface getInstance(){
		if(mCameraInterface == null){
			mCameraInterface = new CameraInterface();
		}
		return mCameraInterface;
	}
	/**打开Camera
	 * @param callback
	 */
	public void doOpenCamera(CamOpenOverCallback callback){
		Log.i(TAG, "Camera open....");
		mCamera = Camera.open();
		Log.i(TAG, "Camera open over....");
		callback.cameraHasOpened();
	}

    public boolean isOpen() {
		boolean isOpen=false;
		if(mCamera!=null){
            isOpen=true;
		}
		return isOpen;
	}
	
	
	/**使用Surfaceview开启预览
	 * @param holder
	 * @param previewRate
	 */
	public void doStartPreview(SurfaceHolder holder, float previewRate,boolean hasNotchScreen,int statusBarHeight){
		Log.i(TAG, "doStartPreview...");
		if(isPreviewing){
			mCamera.stopPreview();
			return;
		}
		if(mCamera != null){
			try {
				//部分机型黑屏，需要做延迟处理，差不多调用so库时间
				Thread.sleep(100);
				mCamera.setPreviewDisplay(holder);
			} catch (IOException | InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			initCamera(previewRate,hasNotchScreen,statusBarHeight);
		}
	}
	/**使用TextureView预览Camera
	 * @param surface
	 * @param previewRate
	 */
	public void doStartPreview(SurfaceTexture surface, float previewRate,boolean hasNotchScreen,int statusBarHeight){
		Log.i(TAG, "doStartPreview...");
		if(isPreviewing){
			mCamera.stopPreview();
			return;
		}
		if(mCamera != null){
			try {
				//部分机型黑屏，需要做延迟处理，差不多调用so库时间
				Thread.sleep(100);
				mCamera.setPreviewTexture(surface);
			} catch (IOException | InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			initCamera(previewRate,hasNotchScreen,statusBarHeight);
		}

	}

	/**
	 * 停止预览，释放Camera
	 */
	public void doStopCamera(){
		Log.i(TAG, "doStopCamera...");

		if(null != mCamera)
		{
			mCamera.setPreviewCallback(null);
			mCamera.stopPreview(); 
			isPreviewing = false; 
			mPreviwRate = -1f;
			mCamera.release();
			mCamera = null;     
		}
	}
	/**
	 * 拍照
	 */
	public void doTakePicture(){
		if(isPreviewing && (mCamera != null)){
			mCamera.takePicture(mShutterCallback, null, mJpegPictureCallback);
		}
	}
	
	int DST_RECT_WIDTH, DST_RECT_HEIGHT;
	
	public void doTakePicture(int w, int h, CamOpenOverCallback callback, String returnPath){
		this.returnPath = returnPath;
		this.takePicture = callback;
		if(isPreviewing && (mCamera != null)){
			DST_RECT_WIDTH = w;
			//DST_RECT_HEIGHT = h ;
			DST_RECT_HEIGHT = w*2/3;
			//this.hasScreen = hasNotchScreen;
			//this.BarHeight = statusBarHeight*2;
			mCamera.takePicture(mShutterCallback, null, mRectJpegPictureCallback);
		}
	}
	
	public Point doGetPrictureSize(){
		Size s = mCamera.getParameters().getPictureSize();
		return new Point(s.width, s.height);
	}





	private void initCamera(float previewRate,boolean hasNotchScreen,int statusBarHeight){
		if(mCamera != null){

			mParams = mCamera.getParameters();
			mParams.setPictureFormat(PixelFormat.JPEG);//设置拍照后存储的图片格式
//			CamParaUtil.getInstance().printSupportPictureSize(mParams);
//			CamParaUtil.getInstance().printSupportPreviewSize(mParams);
			//设置PreviewSize和PictureSize
			int picWidth,picHeight;
			Size pictureSize = CamParaUtil.getInstance().getPropPictureSize(
					mParams.getSupportedPictureSizes(),previewRate, 800);
			Log.i(TAG, "状态栏尺寸:statusBarHeight = " + statusBarHeight );
			Log.i(TAG, "是否刘海屏幕:hasNotchScreen = " + hasNotchScreen );
			if(hasNotchScreen){
				picWidth = pictureSize.width;
				picHeight = pictureSize.height;
				mParams.setPictureSize(picWidth,picHeight);
				Size previewSize = CamParaUtil.getInstance().getPropPreviewSize(
						mParams.getSupportedPreviewSizes(), previewRate, 800);
				Log.i(TAG, "previewSize: width = " + previewSize.width + "height = " +previewSize.height);
				mParams.setPreviewSize(previewSize.width, previewSize.height);
			}else{
				picWidth = pictureSize.width;
				picHeight = pictureSize.height;
				mParams.setPictureSize(picWidth,picHeight);
				Size previewSize = CamParaUtil.getInstance().getPropPreviewSize(
						mParams.getSupportedPreviewSizes(), previewRate, 800);
				Log.i(TAG, "previewSize: width = " + previewSize.width + "height = " +previewSize.height);
				mParams.setPreviewSize(previewSize.width, previewSize.height);
			}
			//解决找不到分辨率情况的设备 适配切图的宽度
            //this.DST_RECT_WIDTH = (int)previewSize.width*9/10;

			mCamera.setDisplayOrientation(90);

//			CamParaUtil.getInstance().printSupportFocusMode(mParams);
			List<String> focusModes = mParams.getSupportedFocusModes();
			if(focusModes.contains("continuous-video")){
				mParams.setFocusMode(Camera.Parameters.FOCUS_MODE_CONTINUOUS_VIDEO);
			}
			mCamera.setParameters(mParams);	
			mCamera.startPreview();//开启预览



			isPreviewing = true;
			mPreviwRate = previewRate;

			mParams = mCamera.getParameters(); //重新get一次
			Log.i(TAG, "最终设置:PreviewSize--With = " + mParams.getPreviewSize().width
					+ "Height = " + mParams.getPreviewSize().height);
			Log.i(TAG, "最终设置:PictureSize--With = " + mParams.getPictureSize().width
					+ "Height = " + mParams.getPictureSize().height);
		}
	}



	/*为了实现拍照的快门声音及拍照保存照片需要下面三个回调变量*/
	ShutterCallback mShutterCallback = new ShutterCallback() 
	//快门按下的回调，在这里我们可以设置类似播放“咔嚓”声之类的操作。默认的就是咔嚓。
	{
		public void onShutter() {
			// TODO Auto-generated method stub
			Log.i(TAG, "myShutterCallback:onShutter...");
		}
	};
	PictureCallback mRawCallback = new PictureCallback() 
	// 拍摄的未压缩原数据的回调,可以为null
	{

		public void onPictureTaken(byte[] data, Camera camera) {
			// TODO Auto-generated method stub
			Log.i(TAG, "myRawCallback:onPictureTaken...");

		}
	};
	/**
	 * 常规拍照
	 */
	PictureCallback mJpegPictureCallback = new PictureCallback() 
	//对jpeg图像数据的回调,最重要的一个回调
	{
		public void onPictureTaken(byte[] data, Camera camera) {
			// TODO Auto-generated method stub
			Log.i(TAG, "myJpegCallback:onPictureTaken...");
			Bitmap b = null;
			if(null != data){
				b = BitmapFactory.decodeByteArray(data, 0, data.length);//data是字节数据，将其解析成位图
				mCamera.stopPreview();
				isPreviewing = false;
			}
			//保存图片到sdcard
			if(null != b)
			{
				//设置FOCUS_MODE_CONTINUOUS_VIDEO)之后，myParam.set("rotation", 90)失效。
				//图片竟然不能旋转了，故这里要旋转下
				Bitmap rotaBitmap = ImageUtil.getRotateBitmap(b, 90.0f);
				FileUtil.saveBitmap(rotaBitmap,returnPath);
			}
			//再次进入预览
			mCamera.startPreview();
			isPreviewing = true;
		}
	};

	/**
	 * 拍摄指定区域的Rect
	 */
	PictureCallback mRectJpegPictureCallback = new PictureCallback() 
	//对jpeg图像数据的回调,最重要的一个回调
	{
		public void onPictureTaken(byte[] data, Camera camera) {
			// TODO Auto-generated method stub
			Log.i(TAG, "myJpegCallback:onPictureTaken...");
			Bitmap b = null;
			if(null != data){
				b = BitmapFactory.decodeByteArray(data, 0, data.length);//data是字节数据，将其解析成位图
				mCamera.stopPreview();
				isPreviewing = false;
			}
			//保存图片到sdcard
			if(null != b)
			{
				//设置FOCUS_MODE_CONTINUOUS_VIDEO)之后，myParam.set("rotation", 90)失效。
				//图片竟然不能旋转了，故这里要旋转下
				Bitmap rotaBitmap = ImageUtil.getRotateBitmap(b, 90.0f);
				//DST_RECT_WIDTH = rotaBitmap.getWidth();
				Log.i(TAG, "DST_RECT_WIDTH: width = " +  DST_RECT_WIDTH + "height = " + DST_RECT_HEIGHT);
				int x = rotaBitmap.getWidth()/2 - DST_RECT_WIDTH/2;
				int y = rotaBitmap.getHeight()/4 - DST_RECT_HEIGHT/2;
				Log.i(TAG, "rotaBitmap.getWidth() = " + rotaBitmap.getWidth()
						+ " rotaBitmap.getHeight() = " + rotaBitmap.getHeight());
				Bitmap rectBitmap = Bitmap.createBitmap(rotaBitmap, x, y, DST_RECT_WIDTH, DST_RECT_HEIGHT);
				FileUtil.saveBitmap(rectBitmap,returnPath);
				if(rotaBitmap.isRecycled()){
					rotaBitmap.recycle();
					rotaBitmap = null;
				}
				if(rectBitmap.isRecycled()){
					rectBitmap.recycle();
					rectBitmap = null;
				}
			}
			//再次进入预览,應該在這裏修改是否重新拍攝
			onReStopPreview();

			if(!b.isRecycled()){
				b.recycle();
				b = null;
			}
			//takePicture.onPictureOver("21","string");
			takePicture.onPictureStepOne();
			/*mCamera.startPreview();
			isPreviewing = true;
			if(!b.isRecycled()){
				b.recycle();
				b = null;
			}*/

		}
	};
	public void onReStopPreview(){
		//停止相機預覽，用於選擇重拍或者確認
		mCamera.stopPreview();
		isPreviewing = false;
	}
	public void onReStartPreview(){
		//再次相機預覽,重新拍攝
		if(mCamera != null) {
			mCamera.startPreview();
			isPreviewing = true;
		}else{
		}
	}

}
