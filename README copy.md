### 提取字体文件
##### 安装docker
因为依赖一个jar包，需要jre，用docker一键拉取部署更方便。   
 
本质是如下调用java处理
```
java -jar sfnttool.jar -s '活动结束倒计时：1234567890时分秒' NO.42.TTF NO.42-1.TTF
```
![Alt](./%E6%B5%8B%E8%AF%95%E5%AD%97%E4%BD%93%E6%96%87%E4%BB%B6/1.png)

##### 步骤
1.安装docker，并启动软件。  
2.npm run build  
3.访问 http://localhost:3000  

![Alt](./%E6%B5%8B%E8%AF%95%E5%AD%97%E4%BD%93%E6%96%87%E4%BB%B6/2.png)
![Alt](./%E6%B5%8B%E8%AF%95%E5%AD%97%E4%BD%93%E6%96%87%E4%BB%B6/3.png)
![Alt](./%E6%B5%8B%E8%AF%95%E5%AD%97%E4%BD%93%E6%96%87%E4%BB%B6/4.png)
都运行正常后，打开 http://localhost:3000  
![Alt](./%E6%B5%8B%E8%AF%95%E5%AD%97%E4%BD%93%E6%96%87%E4%BB%B6/5.png)

4.下次运行直接在docker容器上运行，无需再构建。  
将之前容器内运行的停止并删除，在镜像处重新设置3000端口运行容器  
![Alt](./%E6%B5%8B%E8%AF%95%E5%AD%97%E4%BD%93%E6%96%87%E4%BB%B6/6.png)  

##### 打包成镜像  
```
// 安装好docker  
docker ps  // 获取 CONTAINER ID
docker commit <CONTAINER ID> font_file_pick:latest
docker save -o font_file_pick.tar font_file_pick:latest
```

##### 使用镜像
镜像下载地址：https://o15vj1m4ie.feishu.cn/file/boxcnqFX63FfU8P5mJjUrg0rphf 
用法：  
```
// 安装好docker  
docker --version
docker load -i font_file_pick.tar 
docker run -itd -p 3355:3000 --restart=always font_file_pick:latest
// 打开localhost:3355
```

##### done
已作为公共服务部署 http://192.168.100.252:3355/  

##### 其他 
不考虑ssh脚本注入  
