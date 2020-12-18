//
//  TakePhotoViewController.h
//  RNPasskitDemo
//
//  Created by perimind on 2019/11/16.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

@interface TakePhotoViewController : UIViewController
@property (nonatomic, strong) NSString *tip;
@property (nonatomic, strong) NSString *subTip;
@property (nonatomic, strong) RCTPromiseResolveBlock resolveBlock;
@property (nonatomic, strong) RCTPromiseRejectBlock rejectBlock;
@end

NS_ASSUME_NONNULL_END
