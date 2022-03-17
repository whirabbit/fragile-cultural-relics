package com.fehead.fragileculturalrelics.controller;

import com.fehead.fragileculturalrelics.entity.CommonResult;
import com.fehead.fragileculturalrelics.entity.ObjectDocument;
import com.fehead.fragileculturalrelics.entity.PostInfo;
import com.fehead.fragileculturalrelics.service.ObjectDocumentService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author wrobby
 * @version 1.0
 * @date 2022/3/15 16:50
 */
@RestController
@RequestMapping("/document")
public class ObjectDocumentController {
    private ObjectDocumentService documentService;

    public ObjectDocumentController(ObjectDocumentService documentService) {
        this.documentService = documentService;
    }
    @PostMapping("/submit")
    public CommonResult submit(@RequestBody ObjectDocument document) {
        documentService.saveDocument(document);
        return CommonResult.ok(document.getId());
    }
    @PostMapping("/submitInfo")
    public CommonResult submit(PostInfo info) {
        documentService.saveDocumentInfo(info);
        return CommonResult.ok(info.getId());
    }
}
