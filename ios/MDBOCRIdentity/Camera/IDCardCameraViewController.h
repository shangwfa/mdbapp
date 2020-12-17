//
//  CameraViewController.h
//

#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>
#import "OCRContans.h"

typedef NS_ENUM(NSInteger, RecogOrientation){
    RecogInHorizontalScreen    = 0,
    RecogInVerticalScreen      = 1, 
};
typedef void(^faceSuccess)(NSString *cropImagepath,NSString *headImagepath,NSString *originalImagepath,NSString *typeName,NSString *resultString);
typedef void(^faceError)(NSString *errorData);

@interface IDCardCameraViewController : UIViewController<AVCaptureVideoDataOutputSampleBufferDelegate>

@property (nonatomic, retain) CALayer *customLayer;

@property (nonatomic,assign) BOOL isProcessingImage;

@property (strong, nonatomic) AVCaptureSession *session;

@property (strong, nonatomic) AVCaptureDeviceInput *captureInput;

@property (strong, nonatomic) AVCaptureVideoPreviewLayer *preview;

@property (strong, nonatomic) AVCaptureConnection *videoConnection;

@property (assign, nonatomic) RecogOrientation recogOrientation;

@property (assign, nonatomic) int mainID;
@property (assign, nonatomic) int subID;

@property (copy, nonatomic) NSString *typeName;

- (void) initRecog;
- (void) initialize;
- (void)createCameraView;
//“0”- guide frame; “1”- automatic line detection
@property (assign, nonatomic) int cropType;

//add by mjt for block
#pragma mark - 活体结束回调，使用block
/**
 *  活体全步骤结束，成功的回调
 */
@property (nonatomic, copy) faceSuccess detectFinish;

/**
 *  活体全步骤结束，失败的回调
 */
@property (nonatomic, copy) faceError detectError;



@end
