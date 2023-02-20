git 無法同步在用的
git config --unset core.hooksPath


#Git Error 在同步時出現 git https://………  按Enter確認或ESC取消
    
    解決方式: 
    
    查看 設定是否有username --->  git config -l
    
    [找不到user.name](http://找不到user.name) 出了問題了, 在終端機執行即可
    
     git config --global user.name "yucheng0"
