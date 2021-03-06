package com.bailihui.shop.controller;

import com.bailihui.shop.dto.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Arrays;

/**
 * @author Cnlomou
 * @create 2020/5/26 19:53
 */

@Slf4j
@ControllerAdvice
public class BaseExceptionHandler {

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public Result exceptionHandle(Exception e) {
        log.error("异常：{},message:{}", new Object[]{e.getClass().getName(), Arrays.toString(e.getStackTrace())});
        e.printStackTrace();
        return new Result<>(false, e.getMessage(), null);
    }
}
