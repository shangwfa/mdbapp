//
//  OCRContans.h
//  mobileApp
//
//  Created by lroot on 2019/9/25.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
//extern NSString  *XYLoginMangerDidLoginNotification;

@interface OCRContans : NSObject

+(instancetype)OCRContansManager;
@property (nonatomic,assign) int IS_IPAD;
@property (nonatomic,strong) NSString *kDevcode;
@property (nonatomic,assign) double kFocalScale;
@property (nonatomic,assign) double kScreenWidth;
@property (nonatomic,assign) double kScreenHeight;
@property (nonatomic,assign) double kSafeTopHeight;
@property (nonatomic,assign) double kSafeBottomHeight;
@property (nonatomic,assign) double kSafeLRX;
@property (nonatomic,assign) double kSafeBY;
@property (nonatomic,assign) double kSafeTopHasNavHeight;
@property (nonatomic,assign) double kSafeTopNoNavHeight;
@property (nonatomic,assign) double kResolutionWidth;
@property (nonatomic,assign) double kResolutionHeight;

@end

@interface IDCardResultData : NSObject

//+(instancetype)OCRResultDataManager;
@property (nonatomic, strong) NSMutableDictionary* imagepaths;
@property (nonatomic, strong) NSMutableDictionary* results;
@property (nonatomic, strong) NSString* delta;

@end

@interface OCRIDCardData : NSObject

+(instancetype)OCRIDCardDataManager;
@property (nonatomic,assign) NSString *imageFontBase64;
@property (nonatomic,strong) NSString *imageBackBase64;
@property (nonatomic,assign) NSString *idCard_idCardTag;
@property (nonatomic,assign) NSString *idCard_type;
@property (nonatomic,assign) NSString *idCard_name;
@property (nonatomic,assign) NSString *idCard_number;
@property (nonatomic,assign) NSNumber *idCard_sex;
@property (nonatomic,assign) NSString *idCard_nation;
@property (nonatomic,assign) NSString *idCard_birth;
@property (nonatomic,assign) NSString *idCard_address;
@property (nonatomic,assign) NSString *idCard_takeDate;
@property (nonatomic,assign) NSString *idCard_takeOffice;
@property (nonatomic,assign) NSString *idCard_limitDateOff;
@property (nonatomic,assign) NSString *idCard_limitDate;
@property (nonatomic,assign) NSString *idCard_enname;
//@property (nonatomic,assign) NSString *idCard_limitDateOff;
@end
