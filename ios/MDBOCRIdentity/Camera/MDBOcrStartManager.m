//
//  MDBOcrStartManager.m
//  mobileApp
//
//  Created by lroot on 2019/9/25.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "MDBOcrStartManager.h"
#import "IDCardCameraViewController.h"
#import "OCRContans.h"
@interface MDBOcrStartManager () <UINavigationControllerDelegate>
{
  
}
@end
@implementation MDBOcrStartManager


- (instancetype)init
{
  self = [super init];
  if (self) {
    self.hideNavigationBar = NO;
    //self.types = NSNull;
    self.mainID = 2;
    self.subID = 0;
    self.resultCount = 0;
    self.typeName = @"居民身份证";
  }
  return self;
}

-(void)startFaceDecetionViewController:(UIViewController *)viewController initCameraWithRecogOrientation:(int)recogOrientation CropType:(int)cropType nMainId:(int)nMainId nSubID:(int)nSubID finish:(void(^)(NSString *cropImagepath,NSString *headImagepath,NSString *originalImagepath,NSString *typeName,NSString *resultString))finish error:(void(^)(NSString *errorData))error{
  
  IDCardCameraViewController *cameraVC = [[IDCardCameraViewController alloc] init];
  //[cameraVC initialize];
  //[cameraVC initRecog];
  //[cameraVC createCameraView];
  //[OCRContans OCRContansManager];
  cameraVC.mainID = nMainId;//self.mainID;
  
  cameraVC.subID = nSubID;//self.subID;
  if(nMainId == 2){
    cameraVC.typeName = self.typeName;
  }else if(nMainId == 1005 && nSubID == 1){
    cameraVC.typeName = @"澳門身份証(2002)";
  }else if(nMainId == 1005 && nSubID == 2){
    cameraVC.typeName = @"澳門身份証(2013)";
  }else{
    cameraVC.typeName = self.typeName;
  }
  cameraVC.cropType = cropType;
  cameraVC.recogOrientation = recogOrientation;
  [cameraVC setDetectFinish:finish];
  [cameraVC setDetectError:error];
  
 
  UINavigationController *navi = [[UINavigationController alloc] initWithRootViewController:cameraVC];

  //NSLog(@"startFaceDecetionViewController: %@",@"presentViewController");
  [navi.navigationBar setHidden:self.hideNavigationBar];
  
  [viewController presentViewController:navi animated:YES completion:nil];
  
  //[viewController pushViewController:cameraVC animated:YES];
  
}

@end
