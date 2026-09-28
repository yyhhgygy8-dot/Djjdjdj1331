# StackDome WireGuard Panel

پنل استاتیک آماده برای انتشار در GitHub Pages.

## نکته مهم درباره اتصال واقعی
این پروژه یک UI و مدیریت محلی کلاینت‌هاست. برای کنترل واقعی WireGuard روی سرور StackDome باید API رسمی/دسترسی مدیریتی همان سرویس مشخص باشد. از حدس‌زدن endpointها، توکن‌ها یا کلیدهای خصوصی خودداری شده است.

### انتشار در GitHub Pages
1. این پوشه را داخل یک repository قرار بده.
2. در Settings → Pages، Source را روی branch اصلی و folder ریشه تنظیم کن.
3. سایت را از آدرس GitHub Pages خودت باز کن.

### اتصال Backend
اگر API واقعی در اختیار داری، درخواست‌های `GET/POST/DELETE` کلاینت‌ها را در `assets/app.js` به API خودت متصل کن. توکن‌ها و PrivateKey را داخل JavaScript عمومی قرار نده؛ احراز هویت و تولید کلید را سمت سرور انجام بده.

## امکانات فعلی
- داشبورد WireGuard
- ساخت/حذف/فعال‌سازی کلاینت
- جستجو
- تولید فایل `.conf` نمونه
- ذخیره تنظیمات در LocalStorage
- رابط واکنش‌گرا و فارسی
- مناسب GitHub Pages

## StackDome
https://cloud.stackdome.com/
