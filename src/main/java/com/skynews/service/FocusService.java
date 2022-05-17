package com.skynews.service;

import com.skynews.pojo.Focus;

import java.util.List;

public interface FocusService {
    //关注某用户
    int addFocus(Focus focus);

    //取消关注
    int deleteFocus(Focus focus);

    //查询某个用户所有粉丝
    List<Focus> queryAllFans(int focusID);

    //查询某个用户所有关注
    List<Focus>queryAllFocus(int fansID);

    //判断该用户是否已经关注过另一个用户
    int queryFocus(Focus focus);

    //根据用户id获取用户的粉丝数
    int querySumFans(int focusID);

    //根据用户id获取用户的关注数
    int querySumFocus(int fansID);

    //根据用户id获取用户的粉丝（分页查询）
    List<Focus>queryAllFansPage(int focusID,int num);

    //根据用户id获取用户的关注（分页查询）
    List<Focus>queryAllFocusPage(int fansID,int num);
}
