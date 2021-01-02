//
//  RCTHTTPS.m
//  mdbAPP
//
//  Created by shangwfa on 2020/12/28.
//

#import <React/RCTHTTPRequestHandler.h>

@implementation RCTHTTPRequestHandler(yourPatchName)

- (void)URLSession:(NSURLSession *)session didReceiveChallenge:(NSURLAuthenticationChallenge *)challenge completionHandler:(void (^)(NSURLSessionAuthChallengeDisposition disposition, NSURLCredential *credential))completionHandler
{
     completionHandler(NSURLSessionAuthChallengeUseCredential, [NSURLCredential credentialForTrust:challenge.protectionSpace.serverTrust]);
}
@end
