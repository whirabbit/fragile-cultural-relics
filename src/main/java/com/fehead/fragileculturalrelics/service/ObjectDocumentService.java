package com.fehead.fragileculturalrelics.service;

import com.fehead.fragileculturalrelics.entity.ObjectDocument;
import com.fehead.fragileculturalrelics.entity.PostInfo;

import java.util.List;

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
    List<String> searchDocumentByTitle(String title);

    /**
     * 通过id返回文章
     *
     * @param id
     * @return
     */
    ObjectDocument getDocumentById(String id);

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
    Boolean saveDocumentInfo(PostInfo info);
}
