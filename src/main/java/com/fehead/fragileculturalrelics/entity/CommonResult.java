package com.fehead.fragileculturalrelics.entity;

import lombok.Builder;
import lombok.Data;

/**
 * @author wrobby
 * @version 1.0
 * @date 2022/3/17 19:14
 */
@Data
@Builder
public class CommonResult {
    private static CommonResult ok;
    private Integer code;
    private String status;
    private String message;
    private Object data;

    public static CommonResult ok(Object data) {
        return CommonResult.builder().code(200).status("ok").message("成功").data(data).build();
    }

    public static CommonResult ok() {
        if (ok == null) {
            ok = CommonResult.builder().code(200).status("ok").message("成功").data(null).build();
        }
        return ok;
    }

    public static CommonResult error(String message) {
        return CommonResult.builder().code(500).status("error").message(message).data(null).build();
    }
}
