package com.fehead.fragileculturalrelics.controller;

import com.fehead.fragileculturalrelics.entity.BriefInfo;
import com.fehead.fragileculturalrelics.entity.CommonResult;
import com.fehead.fragileculturalrelics.entity.ObjectDocument;
import com.fehead.fragileculturalrelics.service.ObjectDocumentService;
import org.springframework.web.bind.annotation.*;

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
    public CommonResult submit( @RequestBody BriefInfo info) {
        documentService.saveDocumentInfo(info);
        return CommonResult.ok(info.getId());
    }
    @GetMapping("/search/{title}")
    public CommonResult search(@PathVariable String title){
        return CommonResult.ok(documentService.searchDocumentByTitle(title));
    }
    @GetMapping("/get/{id}")
    public CommonResult getDocument(@PathVariable String id){
        return CommonResult.ok(documentService.getDocumentById(id));
    }

}
