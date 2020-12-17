//
//  OCRContans.m
//  mobileApp
//
//  Created by lroot on 2019/9/25.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "OCRContans.h"

NSString *XYLoginMangerDidLoginNotification = @"XYLoginMangerDidLoginNotification";
/*#define IS_IPAD  (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad);

#define kFocalScale 1.0
//This development code and the authorization under this project is just used for demo
#define kDevcode @"5R6Z6ZAA55M85BG"

#define kScreenWidth  [UIScreen mainScreen].bounds.size.width
#define kScreenHeight [UIScreen mainScreen].bounds.size.height

#define kSafeTopHeight ((kScreenHeight==812.0&&kScreenWidth==375.0)? 44:0)
#define kSafeBottomHeight ((kScreenHeight==812.0&&kScreenWidth==375.0) ? 34:0)
#define kSafeLRX ((kScreenWidth==812.0&&kScreenHeight==375.0) ? 44:0)
#define kSafeBY ((kScreenWidth==812.0&&kScreenHeight==375.0) ? 21:0)
#define kSafeTopHasNavHeight ((kScreenHeight==812.0&&kScreenWidth==375.0)? 88:30)
#define kSafeTopNoNavHeight ((kScreenHeight==812.0&&kScreenWidth==375.0)? 44:0)

#define kResolutionWidth 1280.0
#define kResolutionHeight 720.0
*/
@implementation OCRContans
/*
static OCRContans* _sharedInstance = nil;

+ (OCRContans*)manager
{
  @synchronized(self.class)
  {
    if (_sharedInstance == nil) {
      _sharedInstance = [[self.class alloc] init];
    }
    
    return _sharedInstance;
  }
}
 */
+(instancetype)OCRContansManager{
  static OCRContans *_sharedInstance = nil;
  double TempWidth = [UIScreen mainScreen].bounds.size.width;
  double TempHeight = [UIScreen mainScreen].bounds.size.height;
  if(_sharedInstance == nil){
    _sharedInstance = [[OCRContans alloc]init];
    _sharedInstance.IS_IPAD = (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad);
    _sharedInstance.kFocalScale = 1.0;
    _sharedInstance.kDevcode = @"5R6Z6ZAA55M85BG";
    _sharedInstance.kScreenWidth = TempWidth;//[UIScreen mainScreen].bounds.size.width;
    _sharedInstance.kScreenHeight = TempHeight;//[UIScreen mainScreen].bounds.size.height;
    _sharedInstance.kSafeTopHeight = ((TempHeight==812.0&&TempWidth==375.0)? 44:0);
    _sharedInstance.kSafeBottomHeight = ((TempHeight==812.0&&TempWidth==375.0) ? 34:0);
    _sharedInstance.kSafeLRX = ((TempWidth&&TempHeight==375.0) ? 44:0);
    _sharedInstance.kSafeBY = ((TempWidth&&TempHeight==375.0) ? 21:0);
    _sharedInstance.kSafeTopHasNavHeight = ((TempHeight==812.0&&TempWidth==375.0)? 88:30);
    _sharedInstance.kSafeTopNoNavHeight = ((TempHeight==812.0&&TempWidth==375.0)? 44:0);
    _sharedInstance.kResolutionWidth = 1280.0;
    _sharedInstance.kResolutionHeight = 720.0;
  }
  return _sharedInstance;
}

@end
@implementation IDCardResultData

/*+(instancetype)OCRResultDataManager{
  static IDCardResultData *_sharedInstance = nil;
  if(_sharedInstance == nil){
    _sharedInstance = [[IDCardResultData alloc]init];
  }
   return _sharedInstance;
}*/
@end

@implementation OCRIDCardData
+(instancetype)OCRIDCardDataManager{
  static OCRIDCardData *_idcardInstance = nil;
 if(_idcardInstance == nil){
   _idcardInstance = [[OCRIDCardData alloc]init];
 }
  return _idcardInstance;
}
@end
