package com.fehead.fragileculturalrelics.entity;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author wrobby
 * @version 1.0
 * @date 2022/3/17 23:02
 */
@Data
public class PostInfo {
    private String id;
    /**
     * 文物名称
     */
    private String name;
    /**
     * 文物编号
     */
    private String number;
    /**
     * 考古信息摘要（前10字）
     */
    private String info;
    /**
     * 化学组成（前10字）
     */
    private String chemicalComposition;
    /**
     * 文物照片（缩略图）
     */
    private MultipartFile image;
}
