package com.megvii.livenesslib.takeImage;


import android.app.Activity;
import android.content.Intent;
import android.graphics.Point;
import android.graphics.Rect;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Log;
import android.view.Menu;
import android.view.SurfaceHolder;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;

import com.megvii.livenesslib.R;
import com.megvii.livenesslib.takeImage.preview.CameraSurfaceView;
import com.megvii.livenesslib.takeImage.ui.MaskView;
import com.megvii.livenesslib.takeImage.util.DisplayUtil;

public class CameraActivity extends Activity implements CameraInterface.CamOpenOverCallback {
    private static final String TAG = "[ETANDROID]";
    CameraSurfaceView surfaceView = null;
    ImageButton shutterBtn;
    Button shutterBtn1;
    TextView cancel;
    ImageButton shutterBtn2;
    Button shutterBtn3;
    MaskView maskView = null;
    float previewRate = -1f;
    int DST_CENTER_RECT_WIDTH = 200; //单位是dip
    int DST_CENTER_RECT_HEIGHT =200;//单位是dip
    int DST_CENTER_RECT_HEIGHT2 =200;//单位是dip
    int statusBarHeight;
    boolean hasNotchScreen;
    Point rectPictureSize = null;
    private Intent intent;
    private Uri returnUri;
    private String realPath;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        /* 接收数据，初始化参数配置 */
        intent = getIntent();  //此处并不是创建而是直接获取一个intent对象Return the intent that started this activity.
        Bundle extras= getIntent().getExtras();
        returnUri = extras.getParcelable(MediaStore.EXTRA_OUTPUT);
        realPath = extras.getString("realPath");
        String titleTips1 = extras.getString("titleTips1");
        String titleTips2 = extras.getString("titleTips2");
        String reTakePhotoButtonTitle = extras.getString("reTakePhotoButtonTitle");
        String takePhotoButtonTitle = extras.getString("takePhotoButtonTitle");
        String cancelButtonTitle  = extras.getString("cancelButtonTitle");
        //Log.i(TAG, "returnUri:"+returnUri.toString());
        //Log.i(TAG, "realPath:"+realPath);
        //获取状态栏高度
        View view = this.getWindow().getDecorView();
        Rect rect = new Rect();
        view.getWindowVisibleDisplayFrame(rect);
        this.statusBarHeight = rect.top;
        this.hasNotchScreen = DisplayUtil.hasNotchScreen(this);
        setContentView(R.layout.activity_camera);
        initUI(titleTips1,titleTips2,takePhotoButtonTitle,reTakePhotoButtonTitle,cancelButtonTitle);
        initViewParams();
        /*SurfaceHolder holder = surfaceView.getSurfaceHolder();
        CameraInterface.getInstance().doStartPreview(holder, previewRate);*/
        shutterBtn.setOnClickListener(new BtnListeners());
        shutterBtn1.setOnClickListener(new BtnListeners());
        shutterBtn2.setOnClickListener(new BtnListeners());
        shutterBtn3.setOnClickListener(new BtnListeners());
        cancel.setOnClickListener(new BtnListeners());
        //int a = intent.getIntExtra("a", 0); // 没有输入值默认为0
        //int b = intent.getIntExtra("b", 0); // 没有输入值默认为0
    }

    @Override
    protected void onPause() {
        // TODO Auto-generated method stub
        super.onPause();
        CameraInterface.getInstance().doStopCamera();

    }
    @Override
    protected void onResume() {
        // TODO Auto-generated method stub
        super.onResume();

        Thread openThread = new Thread() {
            @Override
            public void run() {
                // TODO Auto-generated method stub
                CameraInterface.getInstance().doOpenCamera(CameraActivity.this);
            }
        };
        openThread.start();


    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.camera, menu);
        return true;
    }



    private void initUI(String titleTips1,String titleTips2,String takePhotoButtonTitle,String reTakePhotoButtonTitle,String cancelButtonTitle){
        surfaceView = (CameraSurfaceView)findViewById(R.id.camera_surfaceview);
        shutterBtn = (ImageButton)findViewById(R.id.btn_shutter);
        maskView = (MaskView)findViewById(R.id.view_mask);
        shutterBtn1 = (Button)findViewById(R.id.btn_shutter1);
        shutterBtn2 = (ImageButton)findViewById(R.id.btn_shutter2);
        shutterBtn3 = (Button)findViewById(R.id.btn_shutter3);
        cancel =(TextView)findViewById(R.id.btn_cancel);
       // TextView text_titleTips=(TextView)findViewById(R.id.text_titleTips);
        //TextView text_Tips=(TextView)findViewById(R.id.text_Tips);
        //text_titleTips.setText(titleTips1);
        //text_Tips.setText(titleTips2);
        shutterBtn1.setText(takePhotoButtonTitle);
        shutterBtn3.setText(reTakePhotoButtonTitle);
        if("Remake".equals(reTakePhotoButtonTitle)){
            shutterBtn3.setTextSize(16);
        }
        cancel.setText(cancelButtonTitle);
        cancel.getBackground().setAlpha(0);
    }
    private void initViewParams(){
        ViewGroup.LayoutParams params = surfaceView.getLayoutParams();
        Point p = DisplayUtil.getScreenMetrics(this);
        params.width = p.x;
        params.height = p.y;
        DST_CENTER_RECT_WIDTH =  DisplayUtil.px2dip(this,(int)(params.width*0.9));
        DST_CENTER_RECT_HEIGHT =  DisplayUtil.px2dip(this,(int)(params.width*0.6));
        //DST_CENTER_RECT_HEIGHT2 =  DisplayUtil.px2dip(this,(int)(params.width*0.6));
        Log.i(TAG, "screen: w = " + p.x + " y = " + p.y);
        Log.i(TAG, "screen: w = " + p.x + " y = " + p.y);
        previewRate = DisplayUtil.getScreenRate(this); //默认全屏的比例预览
        surfaceView.setLayoutParams(params);
        Log.i(TAG, "previewRate: previewRate = " + previewRate);
//		//手动设置拍照ImageButton的大小为120dip×120dip,原图片大小是64×64
//		LayoutParams p2 = shutterBtn.getLayoutParams();
//		p2.width = DisplayUtil.dip2px(this, 80);
//		p2.height = DisplayUtil.dip2px(this, 80);;
//		shutterBtn.setLayoutParams(p2);

    }

    @Override
    public void cameraHasOpened() {
        // TODO Auto-generated method stub
        SurfaceHolder holder = surfaceView.getSurfaceHolder();
        CameraInterface.getInstance().doStartPreview(holder, previewRate,hasNotchScreen,statusBarHeight);
        if(maskView != null){
            Rect screenCenterRect = createCenterScreenRect(DisplayUtil.dip2px(this, DST_CENTER_RECT_WIDTH)
                    ,DisplayUtil.dip2px(this, DST_CENTER_RECT_HEIGHT));
            maskView.setCenterRect(screenCenterRect);
        }
    }
    @Override
    public void onPictureOver(String code,String msg) {
        Intent intentBack = new Intent();
        intentBack.putExtra("uri","12");
        Log.i("onPictureOver:","onPictureOver setResult intentBack!!!!");
        this.setResult(Activity.RESULT_OK, intentBack);
        this.finish();
    }
    @Override
    public void onPictureStepOne() {
        shutterBtn1.setVisibility(View.GONE);
        shutterBtn2.setVisibility(View.VISIBLE);
        shutterBtn3.setVisibility(View.VISIBLE);

    }
    private class BtnListeners implements OnClickListener{

        @Override
        public void onClick(View v) {
            // TODO Auto-generated method stub
            /*switch(v.getId()){
                case R.id.btn_shutter:
                    if(rectPictureSize == null){
                        rectPictureSize = createCenterPictureRect(DisplayUtil.dip2px(CameraActivity.this, DST_CENTER_RECT_WIDTH)
                                ,DisplayUtil.dip2px(CameraActivity.this, DST_CENTER_RECT_HEIGHT));
                    }
                    CameraInterface.getInstance().doTakePicture(rectPictureSize.x, rectPictureSize.y);
                    break;
                default:break;
            }*/
            if(v.getId() == R.id.btn_shutter || v.getId() == R.id.btn_shutter1){
                if(rectPictureSize == null){
                    rectPictureSize = createCenterPictureRect(DisplayUtil.dip2px(CameraActivity.this, DST_CENTER_RECT_WIDTH)
                            ,DisplayUtil.dip2px(CameraActivity.this, DST_CENTER_RECT_HEIGHT));
                }

                CameraInterface.getInstance().doTakePicture(rectPictureSize.x, rectPictureSize.y,CameraActivity.this,realPath);
            }else if(v.getId() == R.id.btn_shutter2){
                //确认照片返回
                //CameraInterface.getInstance().onReStartPreview();
                Intent intentBack = new Intent();
                intentBack.putExtra("uri","12");
                Log.i("onPictureOver:","onPictureOver setResult intentBack!!!!");
                setResult(Activity.RESULT_OK, intentBack);
                finish();
            }else if(v.getId() == R.id.btn_shutter3){
                //重新拍摄 打开预览
                shutterBtn1.setVisibility(View.VISIBLE);
                shutterBtn2.setVisibility(View.GONE);
                shutterBtn3.setVisibility(View.GONE);
                if(CameraInterface.getInstance().isOpen()){
                    CameraInterface.getInstance().onReStartPreview();
                }else{
                    Intent intentBack = new Intent();
                    setResult(Activity.RESULT_CANCELED, intentBack);
                    finish();
                }

            }else if(v.getId() == R.id.btn_cancel){
                Intent intentBack = new Intent();
                setResult(Activity.RESULT_CANCELED, intentBack);
                finish();
            }

        }

    }

    /**生成拍照后图片的中间矩形的宽度和高度
     * @param w 屏幕上的矩形宽度，单位px
     * @param h 屏幕上的矩形高度，单位px
     * @return
     */
    private Point createCenterPictureRect(int w, int h){

        int wScreen = DisplayUtil.getScreenMetrics(this).x;
        int hScreen = DisplayUtil.getScreenMetrics(this).y;
        int wSavePicture = CameraInterface.getInstance().doGetPrictureSize().y; //因为图片旋转了，所以此处宽高换位
        int hSavePicture = CameraInterface.getInstance().doGetPrictureSize().x; //因为图片旋转了，所以此处宽高换位
        float wRate = (float)(wSavePicture) / (float)(wScreen);
        float hRate = (float)(hSavePicture) / (float)(hScreen);
        float rate = (wRate <= hRate) ? wRate : hRate;//也可以按照最小比率计算

        int wRectPicture = (int)( w * wRate);
        int hRectPicture = (int)( h * hRate);
        return new Point(wRectPicture, hRectPicture);

    }
    /**
     * 生成屏幕中间的矩形
     * @param w 目标矩形的宽度,单位px
     * @param h	目标矩形的高度,单位px
     * @return
     */
    private Rect createCenterScreenRect(int w, int h){
        //int w1 =DisplayUtil.dip2px((double)w);
        //int h1 =DisplayUtil.dip2px(h);
        int x1 = (DisplayUtil.getScreenMetrics(this).x / 2 - w / 2);
        //int x10 = (DisplayUtil.getScreenMetrics(this).x / 2 - w / 2);
        int y1 = (DisplayUtil.getScreenMetrics(this).y / 4 - h / 2);
        int y20 = (DisplayUtil.getScreenMetrics(this).x / 2 - w / 2)*2/3;
        int x2 = x1 + w;
        int y2 = y1 + h ;
        Log.i("createCenterScreenRect:","w" + w + "h" + h );
        Log.i("createCenterScreenRect:","X" + DisplayUtil.getScreenMetrics(this).x + "Y" + DisplayUtil.getScreenMetrics(this).y );
        return new Rect(x1, y1, x2, y2);
    }

}
