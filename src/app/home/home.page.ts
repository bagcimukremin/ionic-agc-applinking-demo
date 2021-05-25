/*
    Copyright 2020. Huawei Technologies Co., Ltd. All rights reserved.

    Licensed under the Apache License, Version 2.0 (the "License")
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        https://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

import {
  AGCAppLinking,
  ShortAppLinkingLengthConstants,
  AppLinkingLinkingPreviewTypeConstants,
  AppLinkingAndroidLinkInfoAndroidOpenTypeConstants,
  Events,
  ResolvedLinkDataResult
} from '@ionic-native/agc-applinking/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  AGConnectAppLinkingResolvedLinkDataResult = '';
  resolvedLinkDataResult: ResolvedLinkDataResult;
  buildShortLinkResult: BuildShortLinkResult;
  buildLongLinkResult: BuildLongLinkResult;
  shortLinkResult: '';
  longLinkResult: '';


  constructor(
    private platform: Platform,
    private agcAppLinking: AGCAppLinking
  ) {
    this.platform.ready().then(() => {
      document.getElementById('AGConnectAppLinkingResolvedLinkDataResult').innerHTML = "AGConnectAppLinkingResolvedLinkDataResult";
      console.log('Platform is ready.');
      this.agcAppLinking.addListener(Events.RECEIVE_LINK, (resolvedLinkDataResult) => {
        this.resolvedLinkDataResult = resolvedLinkDataResult;
        document.getElementById('AGConnectAppLinkingResolvedLinkDataResult').innerHTML = JSON.stringify(
          this.resolvedLinkDataResult,
          null,
          1
        );
      });
    });
  }

  buildShortLink() {
    const socialCardInfo1 = {
      description: 'description short link',
      imageUrl:
        'https://developer.huawei.com/Enexport/system/modules/org.opencms.portal.template.core/resources/images/codelabs/ic_computergraphics.png',
      title: 'title of social card',
    };

    const campaignInfo1 = {
      medium: 'july',
      name: 'summer campaign',
      source: 'Huawei'
    };

    const androidLinkInfo1 = {
      androidFallbackUrl: 'https://consumer.huawei.com/en/',
      androidOpenType: AppLinkingAndroidLinkInfoAndroidOpenTypeConstants.CUSTOM_URL,
      androidDeepLink: 'https://developer.huawei.com/consumer/en/programs/details',
      androidPackageName: 'com.ion.agc.applinking'
    };

    const iosLinkInfo1 = {
      iosDeepLink: "ionhuaweicom://consumer/en/develop/iosdeeplink/details",
      iosFallbackUrl: "https://swift.org/",
      iosBundleId: "com.ion.agc.applinking"
    };
    const iTunesConnectCampaingnInfo1 = {
      iTunesConnectProviderToken: "iTunesConnectProviderToken1",
      iTunesConnectCampaignToken: "iTunesConnectCampaignToken1",
      iTunesConnectAffiliateToken: "iTunesConnectAffiliateToken1",
      iTunesConnectMediaType: "iTunesConnectMediaType1"
    };
    const appLinkingWithInfo = {
      socialCardInfo: socialCardInfo1,
      campaignInfo: campaignInfo1,
      androidLinkInfo: androidLinkInfo1,
      iosLinkInfo: iosLinkInfo1,
      iTunesConnectCampaingnInfo: iTunesConnectCampaingnInfo1,
      uriPrefix: 'https://myagcapplinking.dre.agconnect.link',
      deepLink: 'https://developer.huawei.com/consumer/en/community/codelabs/details',
      expireMinute: 1050,
      //longLink: "your long link of app linking",
      shortAppLinkingLength: ShortAppLinkingLengthConstants.LONG,
      previewType: AppLinkingLinkingPreviewTypeConstants.SOCIAL_INFO
    };

    this.agcAppLinking.buildShortLink(
      appLinkingWithInfo
    ).then((result) => {
      this.buildShortLinkResult = result;
      document.getElementById('shortLinkResult').innerHTML = JSON.stringify(this.buildShortLinkResult, null, 1);
    }).catch((err) => {
      alert("Error buildShortLink: " + JSON.stringify(err, null, 1));
    });
  }
  buildLongLink() {
    const longLinkSocialCardInfo1 = {
      description: 'description long link',
      imageUrl:
        'https://developer.huawei.com/Enexport/system/modules/org.opencms.portal.template.core/resources/images/codelabs/HUAWEI_HA_icon.png',
      title: 'longlink: title link',
    };
    const longLinkCampaignInfo1 = {
      medium: 'September',
      name: 'spring campaign',
      source: 'TEST Huawei Store',
    };
    const longLinkAndroidLinkInfo1 = {
      androidOpenType: AppLinkingAndroidLinkInfoAndroidOpenTypeConstants.APP_GALLERY,
      androidDeepLink: 'https://developer.huawei.com/consumer/en/programs/details',
      androidPackageName: 'com.ion.agc.applinking'
    };
    const longLinkIOSLinkInfo1 = {
      iosDeepLink: "ionhuaweicom://consumer/en/develop/iosdeeplink/details",
      iosFallbackUrl: "https://swift.org/about",
      iosBundleId: "com.ion.agc.applinking",
      ipadFallbackUrl: 'https://swift.org/',
      ipadBundleId: 'com.ion.agc.applinking.ipad',
    };
    const longLinkITunesConnectCampaingnInfo1 = {
      iTunesConnectProviderToken: "longLink1_iTunesConnectProviderToken1",
      iTunesConnectCampaignToken: "longLink1_iTunesConnectCampaignToken1",
      iTunesConnectAffiliateToken: "longLink1_iTunesConnectAffiliateToken1",
      iTunesConnectMediaType: "longLink1_iTunesConnectMediaType1",
    };
    const appLinkingWithInfo = {
      socialCardInfo: longLinkSocialCardInfo1,
      campaignInfo: longLinkCampaignInfo1,
      androidLinkInfo: longLinkAndroidLinkInfo1,
      iosLinkInfo: longLinkIOSLinkInfo1,
      iTunesConnectCampaingnInfo: longLinkITunesConnectCampaingnInfo1,
      uriPrefix: 'https://myagcapplinking.dre.agconnect.link',
      deepLink: 'https://developer.huawei.com/consumer/en/community/codelabs',
      //longLink: "your long link of app linking",
      previewType: AppLinkingLinkingPreviewTypeConstants.SOCIAL_INFO,
    };
    this.agcAppLinking.buildLongLink(
      appLinkingWithInfo
    ).then((result) => {
      this.buildLongLinkResult = result;
      document.getElementById('longLinkResult').innerHTML = JSON.stringify(this.buildLongLinkResult, null, 1);
    }).catch((err) => {
      alert("Error buildLongLink: " + JSON.stringify(err, null, 1));
    });
  }
  copyShortLink() {
    if (this.buildShortLinkResult.shortLink) {
      textToClipboard(this.buildShortLinkResult.shortLink);
      alert("Copied shortLink to clipboard.");
    } else {
      alert("Please build shortLink.");
    }
  }
  copyTestUrl() {
    if (this.buildShortLinkResult.testUrl) {
      textToClipboard(this.buildShortLinkResult.testUrl);
      alert("Copied testURL to clipboard.");
    } else {
      alert("Please build shortLink.");
    }
  }
  copyLongLink() {
    if (this.buildLongLinkResult.longLink) {
      textToClipboard(this.buildLongLinkResult.longLink);
      alert("Copied longLink to clipboard.");
    } else {
      alert("Please build longLink.");
    }
  }
}

interface BuildShortLinkResult {
  shortLink: string;
  testUrl: string;
}
interface BuildLongLinkResult {
  longLink: string;
}
function textToClipboard(text) {
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}
