package com.mdbapp.utils;


/**
 * .
 * @author ET mo_jt
 * @author 2019/07/23
 */

import android.app.Activity;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Rect;
import android.text.TextUtils;
import android.util.Base64;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

public class ETBitMapUtils {

    public static Bitmap onCut (Activity activity){
        try{
           /* //获取window最底层的view
            View view = activity.getWindow().getDecorView();
            view.buildDrawingCache();
            //状态栏高度
            Rect rect = new Rect();
            view.getWindowVisibleDisplayFrame(rect);
            int stateBarHeight = rect.top;
            Display display = activity.getWindowManager().getDefaultDisplay();
            //获取屏幕宽高
            int widths = display.getWidth();
            int height = display.getHeight( );
            //设置允许当前窗口保存缓存信息
            view.setDrawingCacheEnabled(true);
            //解决获取的Bitmap为nu11问题
            view.measure(View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED),View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED));
            view.layout(0,0,view.getMeasuredWidth(), view.getMeasuredHeight());
            view.buildDrawingCache();
            //去掉状态栏高度
            Bitmap bitmap = view.getDrawingCache();
            view.destroyDrawingCache();*/

            /*获取windows中最顶层的view*/
            View view = activity.getWindow().getDecorView();

            //允许当前窗口保存缓存信息
            view.setDrawingCacheEnabled(true);
            view.buildDrawingCache();

            //获取状态栏高度
            Rect rect = new Rect();
            view.getWindowVisibleDisplayFrame(rect);
            int statusBarHeight = rect.top;

            WindowManager windowManager = activity.getWindowManager();

            //获取屏幕宽和高
            DisplayMetrics outMetrics = new DisplayMetrics();
            windowManager.getDefaultDisplay().getMetrics(outMetrics);
            int width = outMetrics.widthPixels;
            int height = outMetrics.heightPixels;

            //去掉状态栏
            Bitmap bitmap = Bitmap.createBitmap(view.getDrawingCache(), 0, statusBarHeight, width,
                    height - statusBarHeight);

            //销毁缓存信息
            view.destroyDrawingCache();
            view.setDrawingCacheEnabled(false);

            return bitmap;
        }catch( Exception e){
            Log.i("jw","cut bitmap err:"+Log.getStackTraceString(e));
            return null;
        }
    }

    /**
     * 将图片转换成Base64编码的字符串
     */
    public static String imageToBase64(String path){
        if(TextUtils.isEmpty(path)){
            return null;
        }
        InputStream is = null;
        byte[] data = null;
        String result = null;
        try{
            is = new FileInputStream(path);
            //创建一个字符流大小的数组。
            data = new byte[is.available()];
            //写入数组
            is.read(data);
            //用默认的编码格式进行编码
            result = Base64.encodeToString(data,Base64.NO_WRAP);
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            if(null !=is){
                try {
                    is.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

        }
        return result;
    }
    public static String bitmapToBase64(Bitmap bitmap) {

        String result = null;
        ByteArrayOutputStream baos = null;
        try {
            if (bitmap != null) {
                baos = new ByteArrayOutputStream();
                bitmap.compress(Bitmap.CompressFormat.JPEG, 100, baos);

                baos.flush();
                baos.close();

                byte[] bitmapBytes = baos.toByteArray();
                result = Base64.encodeToString(bitmapBytes, Base64.NO_WRAP);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (baos != null) {
                    baos.flush();
                    baos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return result;
    }

    /**
     * base64转为bitmap
     * @param base64Data
     * @return
     */
    public static Bitmap base64ToBitmap(String base64Data) {
        byte[] bytes = Base64.decode(base64Data, Base64.DEFAULT);
        return BitmapFactory.decodeByteArray(bytes, 0, bytes.length);
    }

    /*public static Bitmap  drawTextToBitmap(Activity activity){
        Bitmap bitmap = new Bitmap();
        return bitmap;
    }*/


    public static void i(String tag, String msg) {  //信息太长,分段打印
        //因为String的length是字符数量不是字节数量所以为了防止中文字符过多，
        //  把4*1024的MAX字节打印长度改为2001字符数
        int max_str_length = 2001 - tag.length();
        //大于4000时
        while (msg.length() > max_str_length) {
            Log.i(tag, msg.substring(0, max_str_length));
            msg = msg.substring(max_str_length);
        }
        //剩余部分
        Log.i(tag, msg);
    }
}