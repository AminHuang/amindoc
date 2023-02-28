## 显示/隐藏loading


如果您的任务是跨线程的，那么可以使用Android中的异步任务（AsyncTask）来处理它。在AsyncTask中，您可以在后台线程中执行长时间运行的任务，并在任务完成后在UI线程中更新UI。

```kotlin
class MyActivity : AppCompatActivity() {
    private lateinit var loadingView: View
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // 实例化布局文件
        loadingView = layoutInflater.inflate(R.layout.loading_layout, null)
        
        // 添加布局文件到根布局中
        addContentView(loadingView, ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT))
        
        // 默认隐藏Loading UI
        hideLoading()
    }
    
    fun showLoading() {
        loadingView.visibility = View.VISIBLE
    }
    
    fun hideLoading() {
        loadingView.visibility = View.GONE
    }
    
    fun doTask() {
        // 执行异步任务
        MyTask().execute()
    }
    
    inner class MyTask : AsyncTask<Void, Void, Void>() {
        
        override fun onPreExecute() {
            super.onPreExecute()
            showLoading() // 显示Loading UI
        }
        
        override fun doInBackground(vararg params: Void?): Void? {
            // 执行长时间运行的任务
            Thread.sleep(3000)
            return null
        }
        
        override fun onPostExecute(result: Void?) {
            super.onPostExecute(result)
            hideLoading() // 隐藏Loading UI
        }
        
    }
}

```