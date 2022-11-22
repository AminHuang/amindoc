### android.view.WindowLeaked

```
                val builder: MMAlertDialog.Builder = MMAlertDialog.Builder(context)
                val mAuthenDialog = builder.create()
                mAuthenDialog.setOnShowListener(OnShowListener {
                    val button: Button = mAuthenDialog.getButton(AlertDialog.BUTTON_NEGATIVE)
//                    button.setTextColor(MMApplicationContext.getContext().resources.getColor(R.color.cancelbtn_color))
                })
                if (!mAuthenDialog.isShowing) {
                    if (context != null && !context.isFinishing() && !context.isDestroyed()) {
                        mAuthenDialog.show()
                    }
                    else {
                        Log.e(TAG, "hhh")
                    }
                }
```

报错：2022-11-16 17:28:43.719 9199-9199/com.tencent.weauth E/WindowManager: android.view.WindowLeaked: Activity com.tencent.weauth.ui.StandaloneActivity has leaked window DecorView@9adb72b[StandaloneActivity] that was originally added here

原因：activity已经被销毁了，再调 mAuthenDialog.show 就会死
