package com.fehead.fragileculturalrelics.entity;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

/**
 * 文物信息摘要
 *
 * @author wrobby
 * @version 1.0
 * @date 2022/3/15 19:50
 */
@Data
public class BriefInfo {
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
