//
//  CameraViewController.m
//

#import "IDCardCameraViewController.h"
#import "IDCardOverView.h"
//#import "ResultViewController.h"

#if TARGET_IPHONE_SIMULATOR//simulator
#elif TARGET_OS_IPHONE//device
#import "IDCardOCR.h"
#import "OCRContans.h"
#endif


@interface IDCardCameraViewController ()<UIAlertViewDelegate>{
    
    UIButton *_photoBtn;
    UIButton *_backBtn;
    UIButton *_flashBtn;
    UILabel *_middleLabel;
    
    IDCardOverView *_overView;
    BOOL _on;
    
    CAShapeLayer *_maskWithHole;
    AVCaptureDevice *_device;
    BOOL _isFoucePixel;
    int _sliderAllLine;
    int _confimCount;
    int _maxCount;
    int _pixelLensCount;
    float _isIOS8AndFoucePixelLensPosition;
    float _aLensPosition;
    
    UIButton *_lightspotSwitch;
    BOOL _lightspotOn;
    UILabel *_lightspotLabel;
    UILabel *_scanspotLabel;
    
    NSString *_originalImagepath;
    NSString *_cropImagepath;
    NSString *_headImagePath;
    
    int _recogReuslt;
}

#if TARGET_IPHONE_SIMULATOR//simulator
#elif TARGET_OS_IPHONE//device
@property (strong, nonatomic) IDCardOCR *cardRecog;
#endif
@property (assign, nonatomic) BOOL adjustingFocus;
@end
@implementation IDCardCameraViewController

-(void)dealloc{
    
#if TARGET_IPHONE_SIMULATOR//simulator
#elif TARGET_OS_IPHONE//device
    //free the recognition core
    [_cardRecog recogFree];
#endif
}
- (void) viewWillAppear:(BOOL)animated{
    [super viewWillAppear:animated];
    //hide navigationBar
    self.navigationController.navigationBarHidden = YES;
    
    //reset
    _pixelLensCount = 0;
    _confimCount = 0;
    [self orientChange:nil];
    self.isProcessingImage = NO;
    [_overView setLeftHidden:NO];
    [_overView setRightHidden:NO];
    [_overView setBottomHidden:NO];
    [_overView setTopHidden:NO];
    
    //add NSNotification
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(orientChange:) name:UIApplicationDidChangeStatusBarOrientationNotification object:nil];
    AVCaptureDevice*camDevice =[AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
    int flags = NSKeyValueObservingOptionNew;
    [camDevice addObserver:self forKeyPath:@"adjustingFocus" options:flags context:nil];
    if (_isFoucePixel) {
        [camDevice addObserver:self forKeyPath:@"lensPosition" options:flags context:nil];
    }
    //start session
    [self.session startRunning];
    
}
- (void) viewWillDisappear:(BOOL)animated{
    [super viewWillDisappear:animated];
    
    // remove NSNotification
    [[NSNotificationCenter defaultCenter] removeObserver:self name:UIApplicationDidChangeStatusBarOrientationNotification object:nil];
    AVCaptureDevice*camDevice =[AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
    [camDevice removeObserver:self forKeyPath:@"adjustingFocus"];
    if (_isFoucePixel) {
        [camDevice removeObserver:self forKeyPath:@"lensPosition"];
    }
    //stop session
    [self.session stopRunning];
}
-(void)observeValueForKeyPath:(NSString*)keyPath ofObject:(id)object change:(NSDictionary*)change context:(void*)context {
    if([keyPath isEqualToString:@"adjustingFocus"]){
        self.adjustingFocus =[[change objectForKey:NSKeyValueChangeNewKey] isEqualToNumber:[NSNumber numberWithInt:1]];
    }
    if([keyPath isEqualToString:@"lensPosition"]){
        _isIOS8AndFoucePixelLensPosition =[[change objectForKey:NSKeyValueChangeNewKey] floatValue];
    }
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.view.backgroundColor = [UIColor blackColor];
    
    //set image path
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *documentsDirectory = paths[0];
    _originalImagepath = [documentsDirectory stringByAppendingPathComponent:@"originalImage.jpg"];
    _cropImagepath = [documentsDirectory stringByAppendingPathComponent:@"cropImage.jpg"];
    _headImagePath = [documentsDirectory stringByAppendingPathComponent:@"headImage.jpg"];
    _maxCount = 1;
#if TARGET_IPHONE_SIMULATOR//simulator
#elif TARGET_OS_IPHONE//device
    
    // Initialize the camera
    [self initialize];
    
    // Initialize the recognition core
    [self initRecog];
    
#endif
    // Create widget of camera screen
    [self createCameraView];
}


#if TARGET_IPHONE_SIMULATOR//simulator
#elif TARGET_OS_IPHONE//device

- (void) initRecog{
    NSDate *before = [NSDate date];
    self.cardRecog = [[IDCardOCR alloc] init];
    
    /*Acquire system language, load Chinese templates under Chinese system environment, and load English templates under non-Chinese system environment.
     Under English template, the field name is in English. For example, for Chinese field name “姓名”, the responsible English template is “Name”*/
    NSUserDefaults * defaults = [NSUserDefaults standardUserDefaults];
    NSArray * allLanguages = [defaults objectForKey:@"AppleLanguages"];
    int initLanguages;
    NSString * preferredLang = [allLanguages objectAtIndex:0];
    if ([preferredLang rangeOfString:@"zh"].length > 0) {
        initLanguages = 0;
    }else{
        initLanguages = 3;
    }
  
    /*Notice: This development code and the authorization under this project is just used for demo and please replace the  code and .lsc file under Copy Bundle Resources */
    int intRecog = [self.cardRecog InitIDCardWithDevcode:[OCRContans OCRContansManager].kDevcode recogLanguage:0/*initLanguages*/];
    NSLog(@"intRecog = %d\ncoreVersion = %@",intRecog,[self.cardRecog getCoreVersion]);
    
    [self setRecongConfiguration];
    
    NSTimeInterval time = [[NSDate date] timeIntervalSinceDate:before];
    NSLog(@"time：%f", time);
    
}
- (void)setRecongConfiguration{
    
    //set recognition pattern
    if (self.mainID ==3000) { //Machine readable zone
        [self.cardRecog setIDCardIDWithMainID:1033 subID:0 subIDCount:1];
        [self.cardRecog addIDCardIDWithMainID:1034 subID:0 subIDCount:1];
        [self.cardRecog addIDCardIDWithMainID:1036 subID:0 subIDCount:1];
    }else if(self.mainID ==2) { //Chinese ID card
        [self.cardRecog setIDCardIDWithMainID:self.mainID subID:0 subIDCount:1];
        [self.cardRecog addIDCardIDWithMainID:3 subID:0 subIDCount:1];
    }else{
        [self.cardRecog setIDCardIDWithMainID:self.mainID subID:self.subID subIDCount:1];
    }
    
    //set video stream crop type
    [self.cardRecog setVideoStreamCropTypeExWithType:self.cropType];
    
    //set picture clear value
    [self.cardRecog setPictureClearValueEx:80];
    
    if (self.mainID == 3000) {
        //Machine readable zone
        [_cardRecog setParameterWithMode:1 CardType:1033];
    }else{
        [_cardRecog setParameterWithMode:1 CardType:self.mainID];
    }
    //Set up document type for Chinese ID card (0-both sides; 1-obverse side; 2-reverse side)
    [self.cardRecog SetDetectIDCardType:0];
    
    //set rejection
    [self.cardRecog setIDCardRejectType:self.mainID isSet:true];
    
    //set roi
    CGFloat sTop=0.0, sBottom=0.0, sLeft=0.0, sRight=0.0;
    CGRect rect = [self setOverViewSmallRect];
    UIDeviceOrientation currentDeviceOrientatin = [self orientationFormInterfaceOrientation];
    NSDictionary *roiInfo = [self setRoiForDeviceOrientation:currentDeviceOrientatin roiRect:rect];
    sTop = [roiInfo[@"sTop"] floatValue];
    sBottom = [roiInfo[@"sBottom"] floatValue];
    sLeft = [roiInfo[@"sLeft"] floatValue];
    sRight = [roiInfo[@"sRight"] floatValue];
    [self.cardRecog setROIWithLeft:(int)sLeft Top:(int)sTop Right:(int)sRight Bottom:(int)sBottom];
    
    //set recognition orientation
    if (self.recogOrientation == RecogInHorizontalScreen) {
        [self.cardRecog setRecogRotateType:0];
    }else{
        [self.cardRecog setRecogRotateType:1];
    }
}
#endif

// Initialize camera
- (void) initialize{
    if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 7.0) {
        // Judge camera authorization
        NSString *mediaType = AVMediaTypeVideo;
        AVAuthorizationStatus authStatus = [AVCaptureDevice authorizationStatusForMediaType:mediaType];
        if(authStatus == AVAuthorizationStatusRestricted || authStatus == AVAuthorizationStatusDenied){
            
            UIAlertView * alt = [[UIAlertView alloc] initWithTitle:@"Please allow to access your device’s camera in 'Settings'-'Privacy'-'Camera'" message:nil delegate:self cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
            [alt show];
            return;
        }
    }
    //1. Create conversation layer
    self.session = [[AVCaptureSession alloc] init];
    // Set image quality, this resolution if the optimal for recognition, it is best not to change
    [self.session setSessionPreset:AVCaptureSessionPreset1280x720];
    
    //2. Create, configure input device
    NSArray *devices = [AVCaptureDevice devicesWithMediaType:AVMediaTypeVideo];
    
    for (AVCaptureDevice *device in devices){
        if (device.position == AVCaptureDevicePositionBack){
            _device = device;
            self.captureInput = [AVCaptureDeviceInput deviceInputWithDevice:device error:nil];
        }
    }
    if ([self.session canAddInput:self.captureInput]) {
        [self.session addInput:self.captureInput];
    }
    
    //3.Create and configure preview output device
    AVCaptureVideoDataOutput *captureOutput = [[AVCaptureVideoDataOutput alloc] init];
    captureOutput.alwaysDiscardsLateVideoFrames = YES;
    
    dispatch_queue_t queue;
    queue = dispatch_queue_create("cameraQueue", NULL);
    [captureOutput setSampleBufferDelegate:self queue:queue];
    
    NSString* key = (NSString*)kCVPixelBufferPixelFormatTypeKey;
    NSNumber* value = [NSNumber numberWithUnsignedInt:kCVPixelFormatType_32BGRA];
    NSDictionary* videoSettings = [NSDictionary dictionaryWithObject:value forKey:key];
    [captureOutput setVideoSettings:videoSettings];
    [self.session addOutput:captureOutput];
    
    if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 8.0) {
        AVCaptureDeviceFormat *deviceFormat = _device.activeFormat;
        if (deviceFormat.autoFocusSystem == AVCaptureAutoFocusSystemPhaseDetection){
            _isFoucePixel = YES;
            _maxCount = 1;
        }
    }
    
    //4.Preview setting
    self.preview = [AVCaptureVideoPreviewLayer layerWithSession: self.session];
    self.preview.frame = CGRectMake(0, 0, [OCRContans OCRContansManager].kScreenWidth, [OCRContans OCRContansManager].kScreenHeight);
    [self.preview setAffineTransform:CGAffineTransformMakeScale([OCRContans OCRContansManager].kFocalScale, [OCRContans OCRContansManager].kFocalScale)];
    self.preview.videoGravity = AVLayerVideoGravityResizeAspectFill;
    [self.view.layer addSublayer:self.preview];
    
    for (AVCaptureConnection *connection in captureOutput.connections) {
        for (AVCaptureInputPort *port in [connection inputPorts]) {
            if ([[port mediaType] isEqual:AVMediaTypeVideo] ) {
                self.videoConnection = connection;
                break;
            }
        }
        if (self.videoConnection) { break; }
    }
    //set  orientation
    UIDeviceOrientation currentDeviceOrientatin = [self orientationFormInterfaceOrientation];
    AVCaptureVideoOrientation currentVideoOrientation = [self avOrientationForDeviceOrientation:currentDeviceOrientatin];
    //NSLog(@"%ld  %ld",(long)deviceOrientation,(long)currentDeviceOrientatin);
    self.videoConnection.videoOrientation = AVCaptureVideoOrientationLandscapeRight;
    self.preview.connection.videoOrientation = currentVideoOrientation;
    //[self.videoConnection setPreferredVideoStabilizationMode:AVCaptureVideoStabilizationModeAuto];
}

#pragma mark --------------------AVCaptureSession delegate----------------------------
#if TARGET_IPHONE_SIMULATOR//simulator
#elif TARGET_OS_IPHONE//device

- (void)captureOutput:(AVCaptureOutput *)captureOutput
didOutputSampleBuffer:(CMSampleBufferRef)sampleBuffer
       fromConnection:(AVCaptureConnection *)connection{
    
    if (self.isProcessingImage) {
        AudioServicesPlaySystemSound(1108);
        UIImage *tempImage = [self imageFromSampleBuffer:sampleBuffer];
        [self readyToGetImageEx:tempImage];
        return;
    }
    
    CVImageBufferRef imageBuffer = CMSampleBufferGetImageBuffer(sampleBuffer);
    CVPixelBufferLockBaseAddress(imageBuffer,0);
    uint8_t *baseAddress = (uint8_t *)CVPixelBufferGetBaseAddress(imageBuffer);
    int width = (int)CVPixelBufferGetWidth(imageBuffer);
    int height = (int)CVPixelBufferGetHeight(imageBuffer);
    
    BOOL isLoad = [self.cardRecog newLoadImageWithBuffer:baseAddress Width:width Height:height];
    //NSLog(@"isLoad = %d",isLoad);
    if (isLoad == 0){
        //detect line
        IDCardSlideLine *sliderLine = [self.cardRecog newConfirmSlideLine];
        //NSLog(@"sliderLine.allLine == %d",sliderLine.allLine);
        BOOL lineState = sliderLine.allLine>0;
        _sliderAllLine = sliderLine.allLine;
        
        if (self.cropType == 1) {
            NSDictionary *conners = [self.cardRecog obtainRealTimeFourConersID];
            dispatch_sync(dispatch_get_main_queue(), ^{
                [self showLightspotLabel];
                NSArray *points = [self getSmallRectConnersWithConners:conners];
                int isSucceed = [conners[@"isSucceed"] intValue];
                if (isSucceed == -1) {
                    CGRect rect = [self setOverViewSmallRect];
                    NSArray *points1 = [self getFourPoints:rect];
                    [_overView setFourePoints:points1];
                }else if(isSucceed == 1) {
                    [_overView setFourePoints:points];
                }
                [self drawShapeLayerWithSmallFrame:points];
                [_overView setIsSucceed:isSucceed];
            });
        }else{
            dispatch_async(dispatch_get_main_queue(), ^{
                [self showLightspotLabel];
                [_overView setLeftHidden:lineState];
                [_overView setRightHidden:lineState];
                [_overView setBottomHidden:lineState];
                [_overView setTopHidden:lineState];
            });
        }
        
        //detect light spot
        if (_lightspotOn){
            int spot = [self.cardRecog detectLightspot];
            if (spot == 0){
                dispatch_async(dispatch_get_main_queue(), ^{
                    _lightspotLabel.hidden = NO;
                });
                CVPixelBufferUnlockBaseAddress(imageBuffer,0);
                return;
            }else{
                dispatch_async(dispatch_get_main_queue(), ^{
                    _lightspotLabel.hidden = YES;
                });
            }
        }
        if (lineState==YES){
            //For MRZ, after sideline detection, the return value of line detecting method stands for MRZ type, “1033”, “1034” and “1036” means the three type of MRZ
            _sliderAllLine = sliderLine.allLine;
            if (self.adjustingFocus) {
                CVPixelBufferUnlockBaseAddress(imageBuffer,0);
                return;
            }

            if (_aLensPosition == _isIOS8AndFoucePixelLensPosition) {
                _pixelLensCount++;
                if (_pixelLensCount == 1) {
                    _pixelLensCount--;
                    if (_confimCount == _maxCount) {
                        _confimCount = 0;
                        
                        //recognition
                         [self readyToRecog];
                        
                    }else{
                        _confimCount++;
                    }
                }
            }else{
                _confimCount = 0;
                _pixelLensCount = 0;
                _aLensPosition = _isIOS8AndFoucePixelLensPosition;
            }
        }else{
            dispatch_async(dispatch_get_main_queue(), ^{
                if (_sliderAllLine != -139 && _sliderAllLine != -202 && _sliderAllLine != -145) {
                    _scanspotLabel.hidden = YES;
                }
            });
        }
    }
    CVPixelBufferUnlockBaseAddress(imageBuffer,0);
}

-(void)readyToGetImageEx:(UIImage *)image{
    
    //save original image
    [UIImageJPEGRepresentation(image, 1.0f) writeToFile:_originalImagepath atomically:YES];
    
    [self.cardRecog setIDCardRejectType:self.mainID isSet:true];
    
    //set Parameter and recog type
    [self.cardRecog setParameterWithMode:0 CardType:self.mainID];
    
    //set image preproccess
    [self.cardRecog processImageWithProcessType:7 setType:1];
    
    //load image
    int loadImage = [self.cardRecog LoadImageToMemoryWithFileName:_originalImagepath Type:0];
    NSLog(@" = %d",loadImage);
    int recog=-1;
    if (self.mainID != 3000) {
        if (self.mainID == 2) {
            
            // determine the reverse and obverse sides of Chinese second-generation ID card
            recog = [self.cardRecog autoRecogChineseID];
            NSLog(@"sum = %d", recog);
        }else{
            // recognize documents without MRZ
            recog = [self.cardRecog recogIDCardWithMainID:self.mainID];
            NSLog(@"recog:%d",recog);
        }
    }
    if (recog==-6) {
        [self setRecongConfiguration];
        self.isProcessingImage = NO;
        return;
    }
    
    //stop session
    [_session stopRunning];
    //get recognition result
    dispatch_sync(dispatch_get_main_queue(), ^{
        [self getRecogResult];
    });
    //reset the recognition core
    [self setRecongConfiguration];
    
    self.isProcessingImage = NO;
}

-(void)readyToRecog{
    _recogReuslt = -6;
    
    if (self.mainID == 3000) {
        // recognize MRZ
        _recogReuslt = [self.cardRecog recogIDCardWithMainID:_sliderAllLine subID:self.subID];//
        NSLog(@"recog:%d",_recogReuslt);
    }else if(self.mainID == 2){
        // determine the reverse and obverse sides of Chinese second-generation ID card
        _recogReuslt = [self.cardRecog autoRecogChineseID];
        NSLog(@"sum = %d", _recogReuslt);
    }else{
        // recognize documents without MRZ
        _recogReuslt = [self.cardRecog recogIDCardWithMainID:self.mainID subID:self.subID];//[self.cardRecog recogIDCardWithMainID:self.mainID];
        NSLog(@"recog:%d",_recogReuslt);
    }
    
    
    if (_recogReuslt>0) {
        //stop session
        [_session stopRunning];
        AudioServicesPlaySystemSound(kSystemSoundID_Vibrate);
        dispatch_sync(dispatch_get_main_queue(), ^{
            [self getRecogResult];
        });
    }
}
//get result
- (void)getRecogResult{
    
    NSString *allResult = @"";
    //NSMutableDictionary *resultMuDic = [NSMutableDictionary dictionary];
    if (self.mainID != 3000) {
        // save the cut image to headImagePath
        int save =[self. cardRecog saveHeaderImage:_headImagePath];
        
        NSLog(@"save = %d", save);
        for (int i = 1; i < 30; i++) {
            // acquire fields value
            NSString *field = [self.cardRecog GetFieldNameWithIndex:i];
            // acquire fields result
            NSString *result = [self.cardRecog GetRecogResultWithIndex:i];
            //NSLog(@"%@:%@\n",field, result);
            if (field!=nil && result!=nil) {
                allResult = [allResult stringByAppendingString:[NSString stringWithFormat:@"%@:%@|", field, result]];
                //[resultMuDic setObject:result forKey:field];
            }
        }
    }else{
        int mrzCount = _sliderAllLine == 1033 ?4:3;
        for (int i=1; i<mrzCount; i++) {
            NSString *result = [self.cardRecog GetRecogResultWithIndex:i];
            if (result!= nil) {
                allResult = [allResult stringByAppendingString:[NSString stringWithFormat:@"%@|", result]];
                
            }else{
                break;
            }
        }
        _sliderAllLine = 0;
    }
    
    // save the cut image to headImagePath
    int saveCrop = [self.cardRecog saveImage:_cropImagepath];
    NSLog(@"saveCrop = %d", saveCrop);
    
    //图像来源属性
    int sourceType = [self.cardRecog GetImageSourceTypeWithCardType:self.mainID scale:1];
    allResult =  [allResult stringByAppendingString:[NSString stringWithFormat:@"%@:%d|",@"图像来源属性",sourceType]];
    
    if (self.mainID == 2011) {
        NSDictionary *posDic = [self.cardRecog getThaiFeaturePos];
        //NSLog(@"posDic = %@",posDic);
        for (int i=0; i<[[posDic allKeys] count]; i++) {
            NSArray *keys = [posDic allKeys];
            NSArray *values = [posDic allValues];
            allResult =  [allResult stringByAppendingString:[NSString stringWithFormat:@"%@:%@|",keys[i],values[i]]];
        }
    }
    
    if (![allResult isEqualToString:@""]) {
        //jump to the result page
        /*ResultViewController *rvc = [[ResultViewController alloc] initWithNibName:@"ResultViewController" bundle:nil];
        NSLog(@"allresult = %@", allResult);
        rvc.cropImagepath = _cropImagepath;
        rvc.headImagepath = _headImagePath;
        rvc.originalImagepath = _originalImagepath;
        rvc.typeName = self.typeName;
        rvc.resultString = allResult;
        [self.navigationController pushViewController:rvc animated:YES];
         */
      NSLog(@"RecogResult: %@",@"detectFinish");

      /*IDCardResultData *res = [IDCardResultData alloc]; //初始化数据对象
      NSLog(@"_cropImagepath: %@",_cropImagepath);
      NSLog(@"resultString: %@",allResult);
      res.imagepaths[@"cropImagepath"] = _cropImagepath;
      res.imagepaths[@"headImagepath"] = _headImagePath;
      res.imagepaths[@"originalImagepath"] = _originalImagepath;
      res.results[@"typeName"] = self.typeName;
      res.results[@"resultString"] = allResult;
      NSLog(@"resultString: %@",res.results[@"resultString"]);*/
      if (self.detectFinish){
        self.detectFinish(_cropImagepath,_headImagePath,_originalImagepath,self.typeName,allResult);
      }
    }else{
        [_session startRunning];
    }
}
#endif

//Get image from sampleBuffer
- (UIImage *) imageFromSampleBuffer:(CMSampleBufferRef) sampleBuffer{
    CVImageBufferRef imageBuffer = CMSampleBufferGetImageBuffer(sampleBuffer);
    CVPixelBufferLockBaseAddress(imageBuffer, 0);
    void *baseAddress = CVPixelBufferGetBaseAddress(imageBuffer);
    size_t bytesPerRow = CVPixelBufferGetBytesPerRow(imageBuffer);
    size_t width = CVPixelBufferGetWidth(imageBuffer);
    size_t height = CVPixelBufferGetHeight(imageBuffer);
    CGColorSpaceRef colorSpace = CGColorSpaceCreateDeviceRGB();
    CGContextRef context = CGBitmapContextCreate(baseAddress, width, height, 8,
                                                 bytesPerRow, colorSpace, kCGBitmapByteOrder32Little | kCGImageAlphaPremultipliedFirst);
    CGImageRef quartzImage = CGBitmapContextCreateImage(context);
    CVPixelBufferUnlockBaseAddress(imageBuffer,0);
    CGContextRelease(context);
    CGColorSpaceRelease(colorSpace);
    UIImage *image = [UIImage imageWithCGImage:quartzImage scale:1.0f orientation:UIImageOrientationUp];
    CGImageRelease(quartzImage);
    
    //裁切预览时检边框区域图片
    CGRect tempRect = [self setOverViewSmallRect];
    CGFloat tWidth = ([OCRContans OCRContansManager].kFocalScale-1)*[OCRContans OCRContansManager].kScreenWidth*0.5;
    CGFloat tHeight = ([OCRContans OCRContansManager].kFocalScale-1)*[OCRContans OCRContansManager].kScreenHeight*0.5;
    //previewLayer上点坐标
    CGPoint pLTopPoint = CGPointMake((CGRectGetMinX(tempRect)+tWidth)/[OCRContans OCRContansManager].kFocalScale, (CGRectGetMinY(tempRect)+tHeight)/[OCRContans OCRContansManager].kFocalScale);
    CGPoint pRDownPoint = CGPointMake((CGRectGetMaxX(tempRect)+tWidth)/[OCRContans OCRContansManager].kFocalScale, (CGRectGetMaxY(tempRect)+tHeight)/[OCRContans OCRContansManager].kFocalScale);
    CGPoint pRTopPoint = CGPointMake((CGRectGetMaxX(tempRect)+tWidth)/[OCRContans OCRContansManager].kFocalScale, (CGRectGetMinY(tempRect)+tHeight)/[OCRContans OCRContansManager].kFocalScale);
    //CGPoint pLDownPoint = CGPointMake((CGRectGetMinX(tempRect)+tWidth)/kFocalScale, (CGRectGetMaxY(tempRect)+tHeight)/kFocalScale);
    
    //真实图片点坐标
    CGPoint iLTopPoint = [_preview captureDevicePointOfInterestForPoint:pRTopPoint];
    CGPoint iLDownPoint = [_preview captureDevicePointOfInterestForPoint:pLTopPoint];
    CGPoint iRTopPoint = [_preview captureDevicePointOfInterestForPoint:pRDownPoint];
    //CGPoint iRDownPoint = [_preview captureDevicePointOfInterestForPoint:pLDownPoint];
    
    CGFloat y = iLTopPoint.y*[OCRContans OCRContansManager].kResolutionHeight;
    CGFloat x = iLTopPoint.x*[OCRContans OCRContansManager].kResolutionWidth;
    CGFloat w = (iRTopPoint.x-iLTopPoint.x)*[OCRContans OCRContansManager].kResolutionWidth;
    CGFloat h = (iLDownPoint.y-iLTopPoint.y)*[OCRContans OCRContansManager].kResolutionHeight;
    CGRect rect = CGRectMake(x, y, w, h);
    
    CGImageRef imageRef = image.CGImage;
    CGImageRef subImageRef = CGImageCreateWithImageInRect(imageRef, rect);
    UIGraphicsBeginImageContext(rect.size);
    CGContextRef context1 = UIGraphicsGetCurrentContext();
    CGContextDrawImage(context1, rect, subImageRef);
    //UIImage *image1 = [UIImage imageWithCGImage:subImageRef];
    UIGraphicsEndImageContext();
    CGImageRelease(subImageRef);
    return (image);
}
// Create camera screen
- (void)createCameraView{
    CGRect rect = [self setOverViewSmallRect];
    NSArray *points = [self getFourPoints:rect];
    _overView = [[IDCardOverView alloc] initWithFrame:self.view.bounds];
    _overView.cropType = self.cropType;
    [_overView setFourePoints:points];
    _overView.backgroundColor = [UIColor clearColor];
    _overView.center = self.view.center;
    [self.view addSubview:_overView];
    if (self.cropType==0) {
        [self drawShapeLayerWithSmallFrame:points];
    }
    [self creatButtons:rect];
}
- (void)creatButtons:(CGRect) rect{
    _middleLabel = [[UILabel alloc] init];
    _middleLabel.frame = CGRectMake(0, 0, 300, 30);
    _middleLabel.center = self.view.center;
    _middleLabel.backgroundColor = [UIColor clearColor];
    _middleLabel.textColor = [UIColor orangeColor];
    _middleLabel.textAlignment = NSTextAlignmentCenter;
    _middleLabel.text = NSLocalizedString(self.typeName, nil);
    [self.view addSubview:_middleLabel];
    
    CGFloat sTopHeight =[OCRContans OCRContansManager].kSafeTopHeight + 15;
    _backBtn = [[UIButton alloc]initWithFrame:CGRectMake(15+[OCRContans OCRContansManager].kSafeLRX,sTopHeight, 35, 35)];
    [_backBtn addTarget:self action:@selector(backAction) forControlEvents:UIControlEventTouchUpInside];
    [_backBtn setImage:[UIImage imageNamed:@"back_camera_btn"] forState:UIControlStateNormal];
    _backBtn.titleLabel.textAlignment = NSTextAlignmentLeft;
    [self.view addSubview:_backBtn];
    
    _flashBtn = [[UIButton alloc]initWithFrame:CGRectMake([OCRContans OCRContansManager].kScreenWidth-50-[OCRContans OCRContansManager].kSafeLRX,sTopHeight, 35, 35)];
    [_flashBtn setImage:[UIImage imageNamed:@"flash_camera_btn"] forState:UIControlStateNormal];
    [_flashBtn addTarget:self action:@selector(flashBtn) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:_flashBtn];
    
    _photoBtn = [[UIButton alloc]initWithFrame:CGRectMake(0,0,60, 60)];
    _photoBtn.center = CGPointMake([OCRContans OCRContansManager].kScreenWidth*0.5, [OCRContans OCRContansManager].kScreenHeight-30-[OCRContans OCRContansManager].kSafeBottomHeight-[OCRContans OCRContansManager].kSafeBY);
    [_photoBtn setImage:[UIImage imageNamed:@"take_pic_btn"] forState:UIControlStateNormal];
    [_photoBtn addTarget:self action:@selector(photoBtn) forControlEvents:UIControlEventTouchUpInside];
    [_photoBtn setTitleColor:[UIColor grayColor] forState:UIControlStateHighlighted];
    [self.view addSubview:_photoBtn];
    
    _lightspotSwitch = [UIButton buttonWithType:UIButtonTypeCustom];
    _lightspotSwitch.frame = CGRectMake([OCRContans OCRContansManager].kSafeLRX, [OCRContans OCRContansManager].kScreenHeight-30-[OCRContans OCRContansManager].kSafeBottomHeight-[OCRContans OCRContansManager].kSafeBY, 100, 30);
    [_lightspotSwitch setTitle:NSLocalizedString(@"Light spot detection: open", nil) forState:UIControlStateSelected];
    [_lightspotSwitch setTitle:NSLocalizedString(@"Light spot detection: close", nil) forState:UIControlStateNormal];
    _lightspotSwitch.selected = NO;
    [_lightspotSwitch addTarget:self action:@selector(OpenLightspotSwich) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:_lightspotSwitch];
    
    _lightspotLabel = [[UILabel alloc] init];
    _lightspotLabel.frame = CGRectMake(0, 0, 300, 30);
    _lightspotLabel.backgroundColor = [UIColor blackColor];
    _lightspotLabel.textColor = [UIColor whiteColor];
    _lightspotLabel.text = NSLocalizedString(@"Change scan angle when light spot is detected", nil);
    _lightspotLabel.textAlignment = NSTextAlignmentCenter;
    _lightspotLabel.hidden = YES;
    [self.view addSubview:_lightspotLabel];
    
    _scanspotLabel = [[UILabel alloc] init];
    _scanspotLabel.frame = CGRectMake(0, 0, 300, 30);
    _scanspotLabel.backgroundColor = [UIColor blackColor];
    _scanspotLabel.textColor = [UIColor whiteColor];
    _scanspotLabel.text = @"";
    _scanspotLabel.textAlignment = NSTextAlignmentCenter;
    _scanspotLabel.hidden = YES;
    [self.view addSubview:_scanspotLabel];
    CGPoint center = self.view.center;
    _lightspotLabel.center = CGPointMake(center.x+70, center.y);
    _scanspotLabel.center = CGPointMake(center.x+30, center.y);
}
- (CGPoint)realImageTranslateToScreenCoordinate:(CGPoint)point{
    
    CGFloat tWidth = ([OCRContans OCRContansManager].kFocalScale-1)*[OCRContans OCRContansManager].kScreenWidth*0.5;
    CGFloat tHeight = ([OCRContans OCRContansManager].kFocalScale-1)*[OCRContans OCRContansManager].kScreenHeight*0.5;
    CGPoint tempPoint = CGPointMake(point.x/[OCRContans OCRContansManager].kResolutionWidth, point.y/[OCRContans OCRContansManager].kResolutionHeight);
    CGPoint previewPoint = [self.preview pointForCaptureDevicePointOfInterest:tempPoint];
    previewPoint = CGPointMake((previewPoint.x-tWidth)*[OCRContans OCRContansManager].kFocalScale+tWidth, (previewPoint.y-tHeight)*[OCRContans OCRContansManager].kFocalScale+tHeight);
    
    return previewPoint;
}

- (NSArray *)getSmallRectConnersWithConners:(NSDictionary *)conners{
    
    CGPoint point1= CGPointMake(0, 0);
    CGPoint point2= CGPointMake(0, [OCRContans OCRContansManager].kScreenHeight);
    CGPoint point3= CGPointMake([OCRContans OCRContansManager].kScreenWidth, [OCRContans OCRContansManager].kScreenHeight);
    CGPoint point4= CGPointMake([OCRContans OCRContansManager].kScreenWidth,0);
    
    int isS = [conners[@"isSucceed"] intValue];
    if (isS==1) {
        point1 = [self realImageTranslateToScreenCoordinate:CGPointFromString([conners objectForKey:@"point1"])];
        point2 = [self realImageTranslateToScreenCoordinate: CGPointFromString([conners objectForKey:@"point2"])];
        point3 = [self realImageTranslateToScreenCoordinate: CGPointFromString([conners objectForKey:@"point3"])];
        point4 = [self realImageTranslateToScreenCoordinate: CGPointFromString([conners objectForKey:@"point4"])];
    }
    NSArray *points = @[NSStringFromCGPoint(point1),NSStringFromCGPoint(point2),NSStringFromCGPoint(point3),NSStringFromCGPoint(point4)];
    
    return points;
}

- (void) drawShapeLayerWithSmallFrame:(NSArray *)points{
    
    CGPoint point1 = CGPointFromString(points[0]);
    CGPoint point2 = CGPointFromString(points[1]);
    CGPoint point3 = CGPointFromString(points[2]);
    CGPoint point4 = CGPointFromString(points[3]);
    
    if (!_maskWithHole) {
        _maskWithHole = [CAShapeLayer layer];
        [self.view.layer addSublayer:_maskWithHole];
        [self.view.layer setMasksToBounds:YES];
    }
    // Both frames are defined in the same coordinate system
    CGRect biggerRect = CGRectMake(0, 0, [OCRContans OCRContansManager].kScreenWidth, [OCRContans OCRContansManager].kScreenHeight);//self.view.bounds;
    CGFloat offset = 1.0f;
    if ([[UIScreen mainScreen] scale] >= 2) {
        offset = 0.5;
    }
    //CGRect smallerRect = CGRectInset(smallFrame, -offset, -offset) ;
    UIBezierPath *maskPath = [UIBezierPath bezierPath];
    [maskPath moveToPoint:CGPointMake(CGRectGetMinX(biggerRect), CGRectGetMinY(biggerRect))];
    [maskPath addLineToPoint:CGPointMake(CGRectGetMinX(biggerRect), CGRectGetMaxY(biggerRect))];
    [maskPath addLineToPoint:CGPointMake(CGRectGetMaxX(biggerRect), CGRectGetMaxY(biggerRect))];
    [maskPath addLineToPoint:CGPointMake(CGRectGetMaxX(biggerRect), CGRectGetMinY(biggerRect))];
    [maskPath addLineToPoint:CGPointMake(CGRectGetMinX(biggerRect), CGRectGetMinY(biggerRect))];
    
    [maskPath moveToPoint:point1];
    [maskPath addLineToPoint:point2];
    [maskPath addLineToPoint:point3];
    [maskPath addLineToPoint:point4];
    [maskPath addLineToPoint:point1];
    [_maskWithHole setPath:[maskPath CGPath]];
    [_maskWithHole setFillRule:kCAFillRuleEvenOdd];
    if (self.cropType==0) {
        [_maskWithHole setFillColor:[[UIColor colorWithWhite:0 alpha:0.35] CGColor]];
    }else{
        [_maskWithHole setFillColor:[[UIColor colorWithWhite:0.5 alpha:0.5] CGColor]];
    }
}

#pragma mark --------------------ButtonAction----------------------------
- (void)backAction{
    //[self.navigationController popToRootViewControllerAnimated:YES];
  //IDCardResultData *res = [[IDCardResultData alloc]init]; //初始化数据对象
  
  if(self.detectFinish){
    self.detectFinish(@"",@"",@"",@"",@"");
  }
}
- (void)flashBtn{
    AVCaptureDevice *device = [self cameraWithPosition:AVCaptureDevicePositionBack];
    if (![device hasTorch]) {
        //        NSLog(@"no torch");
    }else{
        [device lockForConfiguration:nil];
        if (!_on) {
            [device setTorchMode: AVCaptureTorchModeOn];
            _on = YES;
        }else{
            [device setTorchMode: AVCaptureTorchModeOff];
            _on = NO;
        }
        [device unlockForConfiguration];
    }
}

- (void)photoBtn{
    self.isProcessingImage = YES;
}
- (void) OpenLightspotSwich{
    _lightspotLabel.hidden = YES;
    _lightspotSwitch.selected = !_lightspotSwitch.selected;
    _lightspotOn = _lightspotSwitch.selected;
}

- (void)showLightspotLabel{
    
    if (_sliderAllLine==-145) {
        _scanspotLabel.text = NSLocalizedString(@"The document is too far away", nil);
        _scanspotLabel.hidden = NO;
    }else if (_recogReuslt==-6 ||_sliderAllLine==-139){
        _scanspotLabel.text = [NSString stringWithFormat:@"%@ %@",NSLocalizedString(@"Please recognize", nil),NSLocalizedString(self.typeName, nil)];
        _scanspotLabel.hidden = NO;
    }else if (_sliderAllLine==-202){
    }else{
        
        _scanspotLabel.hidden = YES;
    }
}

#pragma mark -------------------—-NSNotification---------------------------
//reset video orientation
- (void)orientChange:(NSNotification *)notification{
    
    UIDeviceOrientation currentDeviceOrientatin = [self orientationFormInterfaceOrientation];
    AVCaptureVideoOrientation currentVideoOrientation = [self avOrientationForDeviceOrientation:currentDeviceOrientatin];
    
    [self.preview setAffineTransform:CGAffineTransformIdentity];
    self.preview.frame = CGRectMake(0, 0, [OCRContans OCRContansManager].kScreenWidth, [OCRContans OCRContansManager].kScreenHeight);
    [self.preview setAffineTransform:CGAffineTransformMakeScale([OCRContans OCRContansManager].kFocalScale, [OCRContans OCRContansManager].kFocalScale)];
    self.preview.connection.videoOrientation = currentVideoOrientation;
    
    _overView.frame = CGRectMake(0, 0, [OCRContans OCRContansManager].kScreenWidth, [OCRContans OCRContansManager].kScreenHeight);
    CGRect rect = [self setOverViewSmallRect];
    NSArray *points = [self getFourPoints:rect];
    [_overView setFourePoints:points];
    
    if (self.cropType==0) {
        [self drawShapeLayerWithSmallFrame:points];
    }
    
    [self resetUIFrame:currentDeviceOrientatin];
    
    //set roi
    CGFloat sTop=0.0, sBottom=0.0, sLeft=0.0, sRight=0.0;
    NSDictionary *roiInfo = [self setRoiForDeviceOrientation:currentDeviceOrientatin roiRect:rect];
    sTop = [roiInfo[@"sTop"] floatValue];
    sBottom = [roiInfo[@"sBottom"] floatValue];
    sLeft = [roiInfo[@"sLeft"] floatValue];
    sRight = [roiInfo[@"sRight"] floatValue];
#if TARGET_IPHONE_SIMULATOR//simulator
#elif TARGET_OS_IPHONE//device
    int a = [_cardRecog setROIWithLeft:(int)sLeft Top:(int)sTop Right:(int)sRight Bottom:(int)sBottom];
    //NSLog(@"sTop=%f,sBottom=%f,sLeft=%f,sRight=%f",sTop,sBottom,sLeft,sRight);
    //NSLog(@"roi%d", a);
#endif
}

//reset frame
- (void)resetUIFrame:(UIDeviceOrientation)currentDeviceOrientatin{
    
    CGPoint center = CGPointMake([OCRContans OCRContansManager].kScreenWidth*0.5, [OCRContans OCRContansManager].kScreenHeight*0.5);
    CGFloat sTopHeight =[OCRContans OCRContansManager].kSafeTopHeight + 15;
    _backBtn.frame =CGRectMake(15+[OCRContans OCRContansManager].kSafeLRX,sTopHeight, 35, 35);
    _flashBtn.frame = CGRectMake([OCRContans OCRContansManager].kScreenWidth-50-[OCRContans OCRContansManager].kSafeLRX,sTopHeight, 35, 35);
    _photoBtn.center = CGPointMake([OCRContans OCRContansManager].kScreenWidth*0.5, [OCRContans OCRContansManager].kScreenHeight-30-[OCRContans OCRContansManager].kSafeBottomHeight-[OCRContans OCRContansManager].kSafeBY);
    _lightspotSwitch.frame = CGRectMake([OCRContans OCRContansManager].kSafeLRX, [OCRContans OCRContansManager].kScreenHeight-30-[OCRContans OCRContansManager].kSafeBottomHeight-[OCRContans OCRContansManager].kSafeBY, 100, 30);
    switch (currentDeviceOrientatin) {
        case UIDeviceOrientationPortraitUpsideDown:
        case UIDeviceOrientationPortrait:
            if (self.recogOrientation == RecogInHorizontalScreen) {
                _middleLabel.transform = CGAffineTransformMakeRotation(M_PI_2);
                _lightspotLabel.transform = CGAffineTransformMakeRotation(M_PI_2);
                _scanspotLabel.transform = CGAffineTransformMakeRotation(M_PI_2);
                _lightspotLabel.center = CGPointMake(center.x+30, center.y);
                _scanspotLabel.center = CGPointMake(center.x+70, center.y);
            }else{
                _middleLabel.transform = CGAffineTransformMakeRotation(0);
                _lightspotLabel.transform = CGAffineTransformMakeRotation(0);
                _scanspotLabel.transform = CGAffineTransformMakeRotation(0);
                _lightspotLabel.center = CGPointMake(center.x, center.y+70);
                _scanspotLabel.center = CGPointMake(center.x, center.y+30);
            }
            break;
        case UIDeviceOrientationLandscapeLeft:
        case UIDeviceOrientationLandscapeRight:
            if (self.recogOrientation == RecogInHorizontalScreen) {
                _middleLabel.transform = CGAffineTransformMakeRotation(0);
                _lightspotLabel.transform = CGAffineTransformMakeRotation(0);
                _scanspotLabel.transform = CGAffineTransformMakeRotation(0);
                _lightspotLabel.center = CGPointMake(center.x, center.y+70);
                _scanspotLabel.center = CGPointMake(center.x, center.y+30);
            }else{
                _middleLabel.transform = CGAffineTransformMakeRotation(-M_PI_2);
                _lightspotLabel.transform = CGAffineTransformMakeRotation(-M_PI_2);
                _scanspotLabel.transform = CGAffineTransformMakeRotation(-M_PI_2);
                _lightspotLabel.center = CGPointMake(center.x+30, center.y);
                _scanspotLabel.center = CGPointMake(center.x+70, center.y);
            }
            break;
        default:
            break;
    }
    _middleLabel.center = center;
}

//get device orientation
- (UIDeviceOrientation)orientationFormInterfaceOrientation{
    UIDeviceOrientation tempDeviceOrientation = UIDeviceOrientationUnknown;
    UIInterfaceOrientation tempInterfaceOrientation = [[UIApplication sharedApplication] statusBarOrientation];
    switch (tempInterfaceOrientation) {
        case UIInterfaceOrientationPortrait:
            tempDeviceOrientation = UIDeviceOrientationPortrait;
            //NSLog(@"home down");
            break;
        case UIInterfaceOrientationPortraitUpsideDown:
            tempDeviceOrientation = UIDeviceOrientationPortraitUpsideDown;
            //NSLog(@"home up");
            break;
        case UIInterfaceOrientationLandscapeLeft:
            tempDeviceOrientation = UIDeviceOrientationLandscapeRight;
            //NSLog(@"home left");
            break;
        case UIInterfaceOrientationLandscapeRight:
            tempDeviceOrientation = UIDeviceOrientationLandscapeLeft;
            //NSLog(@"home right");
            break;
            
        default:
            break;
    }
    return tempDeviceOrientation;
    
}
//get video orientation
- (AVCaptureVideoOrientation)avOrientationForDeviceOrientation:(UIDeviceOrientation)deviceOrientation
{
    AVCaptureVideoOrientation result = AVCaptureVideoOrientationLandscapeRight;
    switch (deviceOrientation) {
        case UIDeviceOrientationLandscapeRight:
            result = AVCaptureVideoOrientationLandscapeLeft;
            break;
        case UIDeviceOrientationLandscapeLeft:
            result = AVCaptureVideoOrientationLandscapeRight;
            break;
        case UIDeviceOrientationPortrait:
            result = AVCaptureVideoOrientationPortrait;
            break;
        case UIDeviceOrientationPortraitUpsideDown:
            result = AVCaptureVideoOrientationPortraitUpsideDown;
            break;
        default:
            break;
    }
    return result;
}

//reset roi
- (NSMutableDictionary *)setRoiForDeviceOrientation:(UIDeviceOrientation)deviceOrientation roiRect:(CGRect)rect{
    NSMutableDictionary *result = [NSMutableDictionary dictionary];
    CGFloat tWidth = ([OCRContans OCRContansManager].kFocalScale-1)*[OCRContans OCRContansManager].kScreenWidth*0.5;
    CGFloat tHeight = ([OCRContans OCRContansManager].kFocalScale-1)*[OCRContans OCRContansManager].kScreenHeight*0.5;
    CGPoint pLTopPoint = CGPointMake((CGRectGetMinX(rect)+tWidth)/[OCRContans OCRContansManager].kFocalScale, (CGRectGetMinY(rect)+tHeight)/[OCRContans OCRContansManager].kFocalScale);
    CGPoint pLDownPoint = CGPointMake((CGRectGetMinX(rect)+tWidth)/[OCRContans OCRContansManager].kFocalScale, (CGRectGetMaxY(rect)+tHeight)/[OCRContans OCRContansManager].kFocalScale);
    CGPoint pRTopPoint = CGPointMake((CGRectGetMaxX(rect)+tWidth)/[OCRContans OCRContansManager].kFocalScale, (CGRectGetMinY(rect)+tHeight)/[OCRContans OCRContansManager].kFocalScale);
    CGPoint pRDownPoint = CGPointMake((CGRectGetMaxX(rect)+tWidth)/[OCRContans OCRContansManager].kFocalScale, (CGRectGetMaxY(rect)+tHeight)/[OCRContans OCRContansManager].kFocalScale);
    
    CGFloat sTop = 0.0, sBottom = 0.0, sLeft = 0.0, sRight = 0.0;
    CGPoint iLTopPoint,iLDownPoint,iRTopPoint,iRDownPoint;
    switch (deviceOrientation) {
        case UIDeviceOrientationLandscapeRight:
            iLTopPoint = [self.preview captureDevicePointOfInterestForPoint:pRDownPoint];
            iLDownPoint = [self.preview captureDevicePointOfInterestForPoint:pRTopPoint];
            iRTopPoint = [self.preview captureDevicePointOfInterestForPoint:pLDownPoint];
            iRDownPoint = [self.preview captureDevicePointOfInterestForPoint:pLTopPoint];
            break;
        case UIDeviceOrientationLandscapeLeft:
            iLTopPoint = [self.preview captureDevicePointOfInterestForPoint:pLTopPoint];
            iLDownPoint = [self.preview captureDevicePointOfInterestForPoint:pLDownPoint];
            iRTopPoint = [self.preview captureDevicePointOfInterestForPoint:pRTopPoint];
            iRDownPoint = [self.preview captureDevicePointOfInterestForPoint:pRDownPoint];
            break;
        case UIDeviceOrientationPortrait:
            iLTopPoint = [self.preview captureDevicePointOfInterestForPoint:pRTopPoint];
            iLDownPoint = [self.preview captureDevicePointOfInterestForPoint:pLTopPoint];
            iRTopPoint = [self.preview captureDevicePointOfInterestForPoint:pRDownPoint];
            iRDownPoint = [self.preview captureDevicePointOfInterestForPoint:pLDownPoint];
            break;
        case UIDeviceOrientationPortraitUpsideDown:
            iLTopPoint = [self.preview captureDevicePointOfInterestForPoint:pLDownPoint];
            iLDownPoint = [self.preview captureDevicePointOfInterestForPoint:pRDownPoint];
            iRTopPoint = [self.preview captureDevicePointOfInterestForPoint:pLTopPoint];
            iRDownPoint = [self.preview captureDevicePointOfInterestForPoint:pRTopPoint];
            break;
        default:
            break;
    }
    if (self.recogOrientation == RecogInHorizontalScreen) {
        sTop = iLTopPoint.y*[OCRContans OCRContansManager].kResolutionHeight;
        sBottom = iLDownPoint.y*[OCRContans OCRContansManager].kResolutionHeight;
        sLeft = iLTopPoint.x*[OCRContans OCRContansManager].kResolutionWidth;
        sRight = iRTopPoint.x*[OCRContans OCRContansManager].kResolutionWidth;
    }else{
        sTop = iLTopPoint.x*[OCRContans OCRContansManager].kResolutionWidth;
        sBottom = iRTopPoint.x*[OCRContans OCRContansManager].kResolutionWidth;
        sLeft = (1-iLDownPoint.y)*[OCRContans OCRContansManager].kResolutionHeight;
        sRight = (1-iLTopPoint.y)*[OCRContans OCRContansManager].kResolutionHeight;
    }
    [result setObject:[NSNumber numberWithFloat:sTop] forKey:@"sTop"];
    [result setObject:[NSNumber numberWithFloat:sBottom] forKey:@"sBottom"];
    [result setObject:[NSNumber numberWithFloat:sLeft] forKey:@"sLeft"];
    [result setObject:[NSNumber numberWithFloat:sRight] forKey:@"sRight"];
    return result;
}
- (AVCaptureDevice *)cameraWithPosition:(AVCaptureDevicePosition)position{
    NSArray *devices = [AVCaptureDevice devicesWithMediaType:AVMediaTypeVideo];
    for (AVCaptureDevice *device in devices){
        if (device.position == position){
            return device;
        }
    }
    return nil;
}

- (void)fouceMode{
    NSError *error;
    AVCaptureDevice *device = [self cameraWithPosition:AVCaptureDevicePositionBack];
    if ([device isFocusModeSupported:AVCaptureFocusModeAutoFocus]){
        if ([device lockForConfiguration:&error]) {
            CGPoint cameraPoint = [self.preview captureDevicePointOfInterestForPoint:self.view.center];
            [device setFocusPointOfInterest:cameraPoint];
            [device setFocusMode:AVCaptureFocusModeAutoFocus];
            [device unlockForConfiguration];
        }else{
            NSLog(@"Error: %@", error);
        }
    }
}

- (CGRect )setOverViewSmallRect{
    CGRect sRect;
    CGFloat cardScale = 1.58;
    if (self.mainID == 3000) {
        cardScale = 4;
    }
    CGFloat tempWidth;
    CGFloat tempHeight;
    CGFloat tempScale;
    
    if (self.recogOrientation == RecogInHorizontalScreen) {
        if (self.mainID == 3000) {
            tempScale = 0.3;
            if ([OCRContans OCRContansManager].IS_IPAD) {
                tempScale = 0.2;
            }
        }else{
            tempScale = 0.7;
            if ([OCRContans OCRContansManager].IS_IPAD) {
                tempScale = 0.6;
            }
        }
        if ([OCRContans OCRContansManager].kScreenWidth < [OCRContans OCRContansManager].kScreenHeight) {
            tempWidth = [OCRContans OCRContansManager].kScreenWidth*tempScale;
            tempHeight = [OCRContans OCRContansManager].kScreenWidth*tempScale*cardScale;
        }else{
            tempWidth = [OCRContans OCRContansManager].kScreenHeight*tempScale*cardScale;
            tempHeight = [OCRContans OCRContansManager].kScreenHeight*tempScale;
        }
    }else{
        tempScale = 0.8;
        if ([OCRContans OCRContansManager].IS_IPAD) {
            tempScale = 0.8;
        }
        if ([OCRContans OCRContansManager].kScreenWidth < [OCRContans OCRContansManager].kScreenHeight) {
            tempWidth = [OCRContans OCRContansManager].kScreenWidth*tempScale;
            tempHeight = [OCRContans OCRContansManager].kScreenWidth*tempScale/cardScale;
        }else{
            tempWidth = [OCRContans OCRContansManager].kScreenHeight*tempScale/cardScale;
            tempHeight = [OCRContans OCRContansManager].kScreenHeight*tempScale;
        }
    }
    sRect = CGRectMake(([OCRContans OCRContansManager].kScreenWidth-tempWidth)*0.5, ([OCRContans OCRContansManager].kScreenHeight-tempHeight)*0.5, tempWidth,tempHeight);
    return sRect;
}

- (NSArray *)getFourPoints:(CGRect)sRect{
    CGPoint point1= CGPointMake(CGRectGetMinX(sRect), CGRectGetMinY(sRect));
    CGPoint point4= CGPointMake(CGRectGetMinX(sRect), CGRectGetMaxY(sRect));
    CGPoint point2= CGPointMake(CGRectGetMaxX(sRect), CGRectGetMinY(sRect));
    CGPoint point3= CGPointMake(CGRectGetMaxX(sRect), CGRectGetMaxY(sRect));
    NSArray *array = @[NSStringFromCGPoint(point1),NSStringFromCGPoint(point2),NSStringFromCGPoint(point3),NSStringFromCGPoint(point4)];
    return array;
}

- (UIStatusBarStyle)preferredStatusBarStyle{
    return UIStatusBarStyleDefault;
}

- (BOOL)prefersStatusBarHidden{
    return YES;
}

/*
 #pragma mark - Navigation
 
 // In a storyboard-based application, you will often want to do a little preparation before navigation
 - (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
 // Get the new view controller using [segue destinationViewController].
 // Pass the selected object to the new view controller.
 }
 */


@end
