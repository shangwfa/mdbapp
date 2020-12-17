//
//  NativeImagePickerUtil.h
//  mobileApp
//
//  Created by lroot on 2019/10/9.
//  Copyright © 2019年 Facebook. All rights reserved.
//
#import <React/RCTBridgeModule.h>
#import <UIKit/UIKit.h>

typedef NS_ENUM(NSInteger, RNImagePickerTarget) {
  RNImagePickerTargetCamera = 1,
  RNImagePickerTargetLibrarySingleImage,
};

@interface ETImagePickerModule : NSObject <RCTBridgeModule, UINavigationControllerDelegate, UIActionSheetDelegate, UIImagePickerControllerDelegate>

@end
