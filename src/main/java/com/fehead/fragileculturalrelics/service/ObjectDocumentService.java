package com.fehead.fragileculturalrelics.service;

import com.fehead.fragileculturalrelics.entity.BriefInfo;
import com.fehead.fragileculturalrelics.entity.ObjectDocument;

import java.util.List;
import java.util.Map;

/**
 * 文物文档服务类
 *
 * @author wrobby
 * @version 1.0
 * @date 2022/3/15 16:54
 */
public interface ObjectDocumentService {
    /**
     * 检索文章
     *
     * @param title 标题
     * @return id集合
     */
    List<BriefInfo> searchDocumentByTitle(String title);

    /**
     * 通过id返回文章
     *
     * @param id
     * @return
     */
    Map<String ,Object> getDocumentById(String id);

    /**
     * 将文章保存在数据库
     *
     * @param document
     * @return
     */
    Boolean saveDocument(ObjectDocument document);

    /**
     * 将文章简介保存在数据库
     *
     * @param info
     * @return
     */
    Boolean saveDocumentInfo(BriefInfo info);
}
