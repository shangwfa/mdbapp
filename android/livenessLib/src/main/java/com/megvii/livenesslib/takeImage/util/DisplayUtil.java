package com.megvii.livenesslib.takeImage.util;

import android.app.Activity;
import android.content.Context;
import android.graphics.Point;
import android.os.Build;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.DisplayCutout;
import android.view.View;
import android.view.WindowInsets;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class DisplayUtil {
	private static final String TAG = "YanZi";
	/**
	 * dip转px
	 * @param context
	 * @param dipValue
	 * @return
	 */
	public static int dip2px(Context context, float dipValue){            
		final float scale = context.getResources().getDisplayMetrics().density;                 
		return (int)(dipValue * scale + 0.5f);         
	}

	/**
	 * px转dip
	 * @param context
	 * @param pxValue
	 * @return
	 */
	public static int px2dip(Context context, float pxValue){                
		final float scale = context.getResources().getDisplayMetrics().density;                 
		return (int)(pxValue / scale + 0.5f);         
	} 
	
	/**
	 * 获取屏幕宽度和高度，单位为px
	 * @param context
	 * @return
	 */
	public static Point getScreenMetrics(Context context){
		DisplayMetrics dm =context.getResources().getDisplayMetrics();
		int w_screen = dm.widthPixels;
		int h_screen = dm.heightPixels;
		Log.i(TAG, "Screen---Width = " + w_screen + " Height = " + h_screen + " densityDpi = " + dm.densityDpi);
		return new Point(w_screen, h_screen);
		
	}
	
	/**
	 * 获取屏幕长宽比
	 * @param context
	 * @return
	 */
	public static float getScreenRate(Context context){
		Point P = getScreenMetrics(context);
		float H = P.y;
		float W = P.x;
		return (H/W);
	}
	/**
	 * 判断是否是刘海屏
	 * @return
	 */
	public static boolean hasNotchScreen(Activity activity){
		if (getInt("ro.miui.notch",activity) == 1 || hasNotchAtHuawei(activity) || hasNotchAtOPPO(activity)
				|| hasNotchAtVivo(activity) || isAndroidP(activity) != null){ //TODO 各种品牌
			return true;
		}

		return false;
	}

	/**
	 * Android P 刘海屏判断
	 * @param activity
	 * @return
	 */
	public static DisplayCutout isAndroidP(Activity activity){
		View decorView = activity.getWindow().getDecorView();
		if (decorView != null && android.os.Build.VERSION.SDK_INT >= 28){
			WindowInsets windowInsets = decorView.getRootWindowInsets();
			if (windowInsets != null)
				return windowInsets.getDisplayCutout();
		}
		return null;
	}

	/**
	 * 小米刘海屏判断.
	 * @return 0 if it is not notch ; return 1 means notch
	 * @throwsIllegalArgumentException if the key exceeds 32 characters
	 */
	public static int getInt(String key,Activity activity) {
		int result = 0;
		if (isXiaomi()){
			try {
				ClassLoader classLoader = activity.getClassLoader();
				@SuppressWarnings("rawtypes")
				Class SystemProperties = classLoader.loadClass("android.os.SystemProperties");
				//参数类型
				@SuppressWarnings("rawtypes")
				Class[] paramTypes = new Class[2];
				paramTypes[0] = String.class;
				paramTypes[1] = int.class;
				Method getInt = SystemProperties.getMethod("getInt", paramTypes);
				//参数
				Object[] params = new Object[2];
				params[0] = new String(key);
				params[1] = new Integer(0);
				result = (Integer) getInt.invoke(SystemProperties, params);

			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			} catch (NoSuchMethodException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			} catch (IllegalArgumentException e) {
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				e.printStackTrace();
			}
		}
		return result;
	}

	/**
	 * 华为刘海屏判断
	 * @return
	 */
	public static boolean hasNotchAtHuawei(Context context) {
		boolean ret = false;
		try {
			ClassLoader classLoader = context.getClassLoader();
			Class HwNotchSizeUtil = classLoader.loadClass("com.huawei.android.util.HwNotchSizeUtil");
			Method get = HwNotchSizeUtil.getMethod("hasNotchInScreen");
			ret = (boolean) get.invoke(HwNotchSizeUtil);
		} catch (ClassNotFoundException e) {
			//AppLog.e("hasNotchAtHuawei ClassNotFoundException");
		} catch (NoSuchMethodException e) {
			//AppLog.e("hasNotchAtHuawei NoSuchMethodException");
		} catch (Exception e) {
			//AppLog.e( "hasNotchAtHuawei Exception");
		} finally {
			return ret;
		}
	}

	public static final int VIVO_NOTCH = 0x00000020;//是否有刘海
	public static final int VIVO_FILLET = 0x00000008;//是否有圆角

	/**
	 * VIVO刘海屏判断
	 * @return
	 */
	public static boolean hasNotchAtVivo(Context context) {
		boolean ret = false;
		try {
			ClassLoader classLoader = context.getClassLoader();
			Class FtFeature = classLoader.loadClass("android.util.FtFeature");
			Method method = FtFeature.getMethod("isFeatureSupport", int.class);
			ret = (boolean) method.invoke(FtFeature, VIVO_NOTCH);
		} catch (ClassNotFoundException e) {
			//AppLog.e( "hasNotchAtVivo ClassNotFoundException");
		} catch (NoSuchMethodException e) {
			//AppLog.e(  "hasNotchAtVivo NoSuchMethodException");
		} catch (Exception e) {
			//AppLog.e(  "hasNotchAtVivo Exception");
		} finally {
			return ret;
		}
	}
	/**
	 * OPPO刘海屏判断
	 * @return
	 */
	public static boolean hasNotchAtOPPO(Context context) {
		return  context.getPackageManager().hasSystemFeature("com.oppo.feature.screen.heteromorphism");
	}
	// 是否是小米手机
	public static boolean isXiaomi() {
		return "Xiaomi".equals(Build.MANUFACTURER);
	}
}
