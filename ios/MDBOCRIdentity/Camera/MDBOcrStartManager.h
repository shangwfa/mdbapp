//
//  MDBOcrStartManager.h
//  mobileApp
//
//  Created by lroot on 2019/9/25.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#ifndef MDBOcrStartManager_h
#define MDBOcrStartManager_h


#endif /* MDBOcrStartManager_h */


#import <UIKit/UIKit.h>
#import "OCRContans.h"
@interface MDBOcrStartManager : UIViewController

///**
// *  隐藏navigationbar 默认 yes
// */
@property (nonatomic, assign) BOOL hideNavigationBar ;

@property (strong, nonatomic) NSMutableArray *types;
@property (assign, nonatomic) int mainID;
@property (assign, nonatomic) int subID;
@property (assign, nonatomic) int resultCount;
@property (strong, nonatomic) NSString *typeName;

/**
 *  启动检测器
 *
 *  @param viewController 开启活体检测器的 viewcontroller
 *  @param finish         成功的回调
 *  @param error          失败的回调
 *
 *  @return 实例化该对象
 */
-(void)startFaceDecetionViewController:(UIViewController *)viewController
initCameraWithRecogOrientation:(int)recogOrientation
CropType:(int)cropType
nMainId:(int)nMainId
nSubID:(int)nSubID
finish:(void(^)(NSString *cropImagepath,NSString *headImagepath,NSString *originalImagepath,NSString *typeName,NSString *resultString))finish
error:(void(^)(NSString *errorData))error;

@end
