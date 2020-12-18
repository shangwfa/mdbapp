//
//  TakePhotoViewController.m
//  RNPasskitDemo
//
//  Created by perimind on 2019/11/16.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "TakePhotoViewController.h"
#import <Photos/Photos.h>

@interface TakePhotoViewController ()<AVCaptureMetadataOutputObjectsDelegate>
@property (weak, nonatomic) IBOutlet UILabel *tipLabel;
@property (weak, nonatomic) IBOutlet UILabel *subTipLabel;
@property (weak, nonatomic) IBOutlet UIButton *takePhotoBtn;
@property (weak, nonatomic) IBOutlet UIButton *commitPhotoBtn;
@property (weak, nonatomic) IBOutlet UIButton *reTakePhotoBtn;
@property (weak, nonatomic) IBOutlet UIView *takePhotoContainerView;
@property (weak, nonatomic) IBOutlet UIView *commitPhotoContainerView;
@property (weak, nonatomic) IBOutlet UIView *cameraView;
@property (weak, nonatomic) IBOutlet UIView *maskView;
@property (weak, nonatomic) IBOutlet UIImageView *photoBoxImgView;
@property (weak, nonatomic) IBOutlet UIImageView *previewPhotoBoxImgView;

@property (nonatomic) BOOL commited;

//捕获设备，通常是前置摄像头，后置摄像头，麦克风（音频输入）
@property(nonatomic)AVCaptureDevice *device;
//AVCaptureDeviceInput 代表输入设备，他使用AVCaptureDevice 来初始化
@property(nonatomic)AVCaptureDeviceInput *input;
//当启动摄像头开始捕获输入
@property(nonatomic)AVCaptureMetadataOutput *output;
//输出
@property (nonatomic)AVCaptureStillImageOutput *ImageOutPut;
//session：由他把输入输出结合在一起，并开始启动捕获设备（摄像头）
@property(nonatomic)AVCaptureSession *session;
//图像预览层，实时显示捕获的图像
@property(nonatomic)AVCaptureVideoPreviewLayer *previewLayer;
//拍到的照片
@property (nonatomic, strong) UIImage *cameraImage;
//裁剪后的照片
@property (nonatomic, strong) UIImage *cropOutedImage;

@end

@implementation TakePhotoViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  // Do any additional setup after loading the view from its nib.
  [self.navigationController.navigationBar setBackgroundImage:[UIImage new] forBarMetrics:UIBarMetricsDefault];
  self.navigationController.navigationBar.shadowImage = [UIImage new];
//  self.navigationController.navigationBar.translucent = YES;
  self.navigationController.navigationBar.tintColor = UIColor.whiteColor;
  self.navigationController.navigationBar.titleTextAttributes = @{NSForegroundColorAttributeName:[UIColor whiteColor]};
  self.reTakePhotoBtn.layer.borderColor = UIColor.whiteColor.CGColor;
  self.reTakePhotoBtn.layer.borderWidth = 2;
  //UIColor *color = [UIColor colorWithPatternImage:[UIImage imageNamed:@"img_camera_bg.png"]];
  //[self.photoBoxImgView setBackgroundColor:color];
  [self setUIViewBackgound:self.commitPhotoBtn name:@"btn_camera_ok.png"];
  //[self setUIViewBackgound:self.previewPhotoBoxImgView name:@"img_camera_bg.png"];

  if (self.tip.length>0) {
    [self.tipLabel setText:self.tip];
  }
  if (self.subTip.length>0) {
    [self.subTipLabel setText:self.subTip];
  }
  self.commited = NO;
  //点击屏幕对焦
  UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(focusTap:)];
  [self.view addGestureRecognizer:tap];
  
  [self canUseCamera];
  [self customCamera];
  
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(applicationWillResignActive:)
                                               name:UIApplicationWillResignActiveNotification object:nil];
}
- (void)applicationWillResignActive:(NSNotification *)notification

{
  printf("按理说是触发home按下\n");
  [self dismissViewControllerAnimated:YES completion:nil];
  
}
-(void)setUIViewBackgound:(UIView *)uiview name:(NSString *)name {
  
  UIGraphicsBeginImageContext(uiview.frame.size);
  [[UIImage imageNamed:name] drawInRect:uiview.bounds];
  UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
  UIGraphicsEndImageContext();
  
  uiview.backgroundColor = [UIColor colorWithPatternImage:image];
}

-(void)viewDidAppear:(BOOL)animated{
  [super viewDidAppear:animated];
  [self makeTransparent:self.maskView rect:self.photoBoxImgView.frame maskColor:UIColor.grayColor];
}
- (void)viewDidDisappear:(BOOL)animated{
  [super viewDidDisappear:animated];
  if (!self.commited) {
    self.rejectBlock(@"ERR001", @"ERR001", nil);
  }
}
-(UIStatusBarStyle)preferredStatusBarStyle{
  return UIStatusBarStyleLightContent;
}
- (IBAction)dismiss:(id)sender {
  [self dismissViewControllerAnimated:YES completion:nil];
}
- (IBAction)takePhoto:(id)sender {
  self.commitPhotoContainerView.hidden = !self.commitPhotoContainerView.hidden;
  self.takePhotoContainerView.hidden = !self.takePhotoContainerView.hidden;
  
  AVCaptureConnection * videoConnection = [self.ImageOutPut connectionWithMediaType:AVMediaTypeVideo];
  if (!videoConnection) {
    NSLog(@"take photo failed!");
    return;
  }
  
  [self.ImageOutPut captureStillImageAsynchronouslyFromConnection:videoConnection completionHandler:^(CMSampleBufferRef imageDataSampleBuffer, NSError *error) {
    if (imageDataSampleBuffer == NULL) {
      return;
    }
    NSData * imageData = [AVCaptureStillImageOutput jpegStillImageNSDataRepresentation:imageDataSampleBuffer];
    self.cameraImage = [UIImage imageWithData:imageData];
    CGImageRef ref = self.cameraImage.CGImage;
    CGRect outputRect = [self.previewLayer metadataOutputRectOfInterestForRect:self.photoBoxImgView.frame];
    size_t width = CGImageGetWidth(ref);
    size_t height = CGImageGetHeight(ref);
    CGRect cropRect = CGRectMake(outputRect.origin.x * width, outputRect.origin.y * height, outputRect.size.width * width, outputRect.size.height * height);
    CGImageRef destRef = CGImageCreateWithImageInRect(ref, cropRect);
    self.cropOutedImage = [UIImage imageWithCGImage:destRef scale:1 orientation:self.cameraImage.imageOrientation];
    [self.previewPhotoBoxImgView setImage:self.cropOutedImage];
    NSLog(@"image size = %@",NSStringFromCGSize(self.cropOutedImage.size));
  }];
}
- (IBAction)reTakePhoto:(id)sender {
  self.commitPhotoContainerView.hidden = !self.commitPhotoContainerView.hidden;
  self.takePhotoContainerView.hidden = !self.takePhotoContainerView.hidden;
  self.previewPhotoBoxImgView.image = nil;
  self.cropOutedImage = nil;
}
- (IBAction)commitPhoto:(id)sender {
  if (self.cropOutedImage) {
    [self dismissViewControllerAnimated:YES completion:nil];
    
    NSArray *paths =NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,NSUserDomainMask,YES);
    NSString *filePath = [[paths objectAtIndex:0] stringByAppendingPathComponent:[NSString stringWithFormat:@"%@temp.jpg", self.tip]];
    NSFileManager *manager = [NSFileManager defaultManager];
    if ([manager fileExistsAtPath:filePath]) {
      [manager removeItemAtPath:filePath error:nil];
    }
    UIImage *editedImage = [self fixOrientation:self.cropOutedImage];
    [UIImageJPEGRepresentation(editedImage, 0.3) writeToFile:filePath atomically:YES];
    
    NSData *data = UIImageJPEGRepresentation(editedImage, 0.3);
    NSString *str = [data base64EncodedStringWithOptions:0];
    self.resolveBlock(@{@"imgPath":filePath, @"data":str});
    self.commited = YES;
  }
}

- (BOOL)canUseCamera{
  AVAuthorizationStatus authStatus = [AVCaptureDevice authorizationStatusForMediaType:AVMediaTypeVideo];
  if (authStatus == AVAuthorizationStatusDenied) {
    UIAlertController *alertVC = [UIAlertController alertControllerWithTitle:@"请打开相机权限" message:@"设置-隐私-相机" preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
      
    }];
    UIAlertAction *doneAction = [UIAlertAction actionWithTitle:@"确定" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
      
    }];
    [alertVC addAction:cancelAction];
    [alertVC addAction:doneAction];
    [self presentViewController:alertVC animated:YES completion:nil];
    return NO;
  }
  else{
    return YES;
  }
  return YES;
}

#pragma mark - 自定义相机
- (void)customCamera{
  self.device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
  self.input = [[AVCaptureDeviceInput alloc]initWithDevice:self.device error:nil];
  self.output = [[AVCaptureMetadataOutput alloc]init];
  self.ImageOutPut = [[AVCaptureStillImageOutput alloc] init];
  
  
  //生成会话，用来结合输入输出
  self.session = [[AVCaptureSession alloc]init];
  if ([self.session canSetSessionPreset:AVCaptureSessionPresetPhoto]) {
    self.session.sessionPreset = AVCaptureSessionPresetPhoto;
  }
  if ([self.session canAddInput:self.input]) {
    [self.session addInput:self.input];
  }
  
  if ([self.session canAddOutput:self.ImageOutPut]) {
    [self.session addOutput:self.ImageOutPut];
  }
  
  //开始启动
  [self.session startRunning];
  if ([self.device lockForConfiguration:nil]) {
    if ([self.device isFlashModeSupported:AVCaptureFlashModeAuto]) {
      [self.device setFlashMode:AVCaptureFlashModeAuto];
    }
    //自动白平衡
    if ([self.device isWhiteBalanceModeSupported:AVCaptureWhiteBalanceModeAutoWhiteBalance]) {
      [self.device setWhiteBalanceMode:AVCaptureWhiteBalanceModeAutoWhiteBalance];
    }
    
    [self.device unlockForConfiguration];
  }
  
  self.previewLayer = [[AVCaptureVideoPreviewLayer alloc]initWithSession:self.session];
  self.previewLayer.frame = self.maskView.frame;
  self.previewLayer.videoGravity = AVLayerVideoGravityResizeAspectFill;
  
  [self.cameraView.layer addSublayer:self.previewLayer];
}

//点击屏幕对焦
-(void)focusTap:(UIGestureRecognizer *)tap{
  CGPoint point = [tap locationInView:self.cameraView];
  float Y = point.y;
  if (Y<60 || Y>([UIScreen mainScreen].bounds.size.height / 2)) {
    return;
  }
  
  CGSize size = self.cameraView.bounds.size;
  CGPoint focusPoint = CGPointMake(point.x/size.width, point.y/size.height);
  if ([self.device lockForConfiguration:nil]) {
    if ([self.device isFocusModeSupported:AVCaptureFocusModeAutoFocus]) {
      [self.device setFocusPointOfInterest:focusPoint];
      [self.device setFocusMode:AVCaptureFocusModeAutoFocus];
    }
    if ([self.device isExposureModeSupported:AVCaptureExposureModeAutoExpose ]) {
      [self.device setExposurePointOfInterest:focusPoint];
      [self.device setExposureMode:AVCaptureExposureModeAutoExpose];
    }
    [self.device unlockForConfiguration];
  }
}

- (void)makeTransparent:(UIView*)view rect:(CGRect)rect maskColor:(UIColor*)color{
  //背景
  UIBezierPath *path = [UIBezierPath bezierPathWithRoundedRect:view.frame cornerRadius:0];
  //镂空
  UIBezierPath *transparentPath = [UIBezierPath bezierPathWithRoundedRect:rect cornerRadius:0];
  [path appendPath:transparentPath];
  [path setUsesEvenOddFillRule:YES];
  
  CAShapeLayer *fillLayer = [CAShapeLayer layer];
  fillLayer.frame = view.frame;
  fillLayer.path = path.CGPath;
  fillLayer.fillRule = kCAFillRuleEvenOdd;
  fillLayer.fillColor = color.CGColor;
  fillLayer.opacity = 0.72;
  [view.layer addSublayer:fillLayer];
}

/*
 #pragma mark - Navigation
 
 // In a storyboard-based application, you will often want to do a little preparation before navigation
 - (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
 // Get the new view controller using [segue destinationViewController].
 // Pass the selected object to the new view controller.
 }
 */
- (UIImage *)fixOrientation:(UIImage *)srcImg {
  if (srcImg.imageOrientation == UIImageOrientationUp) {
    return srcImg;
  }
  
  CGAffineTransform transform = CGAffineTransformIdentity;
  switch (srcImg.imageOrientation) {
    case UIImageOrientationDown:
    case UIImageOrientationDownMirrored:
      transform = CGAffineTransformTranslate(transform, srcImg.size.width, srcImg.size.height);
      transform = CGAffineTransformRotate(transform, M_PI);
      break;
      
    case UIImageOrientationLeft:
    case UIImageOrientationLeftMirrored:
      transform = CGAffineTransformTranslate(transform, srcImg.size.width, 0);
      transform = CGAffineTransformRotate(transform, M_PI_2);
      break;
      
    case UIImageOrientationRight:
    case UIImageOrientationRightMirrored:
      transform = CGAffineTransformTranslate(transform, 0, srcImg.size.height);
      transform = CGAffineTransformRotate(transform, -M_PI_2);
      break;
    case UIImageOrientationUp:
    case UIImageOrientationUpMirrored:
      break;
  }
  
  switch (srcImg.imageOrientation) {
    case UIImageOrientationUpMirrored:
    case UIImageOrientationDownMirrored:
      transform = CGAffineTransformTranslate(transform, srcImg.size.width, 0);
      transform = CGAffineTransformScale(transform, -1, 1);
      break;
      
    case UIImageOrientationLeftMirrored:
    case UIImageOrientationRightMirrored:
      transform = CGAffineTransformTranslate(transform, srcImg.size.height, 0);
      transform = CGAffineTransformScale(transform, -1, 1);
      break;
    case UIImageOrientationUp:
    case UIImageOrientationDown:
    case UIImageOrientationLeft:
    case UIImageOrientationRight:
      break;
  }
  
  CGContextRef ctx = CGBitmapContextCreate(NULL, srcImg.size.width, srcImg.size.height, CGImageGetBitsPerComponent(srcImg.CGImage), 0, CGImageGetColorSpace(srcImg.CGImage), CGImageGetBitmapInfo(srcImg.CGImage));
  CGContextConcatCTM(ctx, transform);
  switch (srcImg.imageOrientation) {
    case UIImageOrientationLeft:
    case UIImageOrientationLeftMirrored:
    case UIImageOrientationRight:
    case UIImageOrientationRightMirrored:
      CGContextDrawImage(ctx, CGRectMake(0,0,srcImg.size.height,srcImg.size.width), srcImg.CGImage);
      break;
      
    default:
      CGContextDrawImage(ctx, CGRectMake(0,0,srcImg.size.width,srcImg.size.height), srcImg.CGImage);
      break;
  }
  
  CGImageRef cgimg = CGBitmapContextCreateImage(ctx);
  UIImage *img = [UIImage imageWithCGImage:cgimg];
  CGContextRelease(ctx);
  CGImageRelease(cgimg);
  return img;
}

- (BOOL)addSkipBackupAttributeToItemAtPath:(NSString *) filePathString
{
  NSURL* URL= [NSURL fileURLWithPath: filePathString];
  if ([[NSFileManager defaultManager] fileExistsAtPath: [URL path]]) {
    NSError *error = nil;
    BOOL success = [URL setResourceValue: [NSNumber numberWithBool: YES]
                                  forKey: NSURLIsExcludedFromBackupKey error: &error];
    
    if(!success){
      NSLog(@"Error excluding %@ from backup %@", [URL lastPathComponent], error);
    }
    return success;
  }
  else {
    NSLog(@"Error setting skip backup attribute: file not found");
    return NO;
  }
}
@end
