package com.fehead.fragileculturalrelics.controller;

import com.fehead.fragileculturalrelics.entity.CommonResult;
import com.fehead.fragileculturalrelics.entity.SavedFile;
import com.fehead.fragileculturalrelics.entity.SavedImage;
import com.fehead.fragileculturalrelics.service.SavedFileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author wrobby
 * @version 1.0
 * @date 2022/3/17 20:31
 */
@Slf4j
@RestController
@RequestMapping("/file")
public class FileController {
    private SavedFileService savedFileService;

    public FileController(SavedFileService savedFileService) {
        this.savedFileService = savedFileService;
    }

    @PostMapping("/upload/image")
    public CommonResult uploadImage(MultipartFile image) {
        SavedImage savedImage = new SavedImage();
        try {
            savedImage.setFile(image.getBytes());
        } catch (IOException e) {
            return CommonResult.error(e.getMessage());
        }
        return CommonResult.ok("image:"+savedFileService.saveImage(savedImage));
    }

    @PostMapping("/upload/csv")
    public CommonResult uploadCsv(MultipartFile csv) {
        SavedFile savedFile = new SavedFile();
        try {
            savedFile.setFile(csv.getBytes());
        } catch (IOException e) {
            return CommonResult.error(e.getMessage());
        }
        return CommonResult.ok("csv:"+savedFileService.saveCsv(savedFile));
    }

    @GetMapping("/onload/csv/{id}")
    public void onloadImage(@PathVariable String id, HttpServletResponse response) throws IOException {
        SavedFile file = savedFileService.getCsvById(id);
        if (file != null) {
            response.setContentType("txt/csv");
            response.getOutputStream().write(file.getFile());
        } else {
            log.error("/csv/" + id + "获取文件时出错");

        }
    }

    @GetMapping("/onload/image/{id}")
    public void onloadCsv(@PathVariable String id, HttpServletResponse response) throws IOException {
        SavedImage file = savedFileService.getImageById(id);
        if (file != null) {
            response.setContentType("image/*");
            response.getOutputStream().write(file.getFile());
        } else {
            log.error("/image/" + id + "获取文件时出错");

        }
    }
}
