package com.fehead.fragileculturalrelics.entity;

import lombok.Data;

/**
 * CSV保存格式
 *
 * @author wrobby
 * @version 1.0
 * @date 2022/3/15 17:03
 */
@Data
public class SavedFile {
    private String id;
    private byte[] file;
}
