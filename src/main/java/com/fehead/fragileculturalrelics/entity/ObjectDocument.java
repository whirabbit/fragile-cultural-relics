package com.fehead.fragileculturalrelics.entity;

import cn.hutool.json.JSONObject;
import lombok.Data;

/**
 * 文物信息保存格式
 *
 * @author wrobby
 * @version 1.0
 * @date 2022/3/15 14:25
 */
@Data
public class ObjectDocument {
    private String id;
    private JSONObject document;

}
