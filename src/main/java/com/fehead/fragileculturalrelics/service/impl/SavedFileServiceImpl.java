package com.fehead.fragileculturalrelics.service.impl;

import com.fehead.fragileculturalrelics.entity.SavedFile;
import com.fehead.fragileculturalrelics.entity.SavedImage;
import com.fehead.fragileculturalrelics.service.SavedFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

/**
 * @author wrobby
 * @version 1.0
 * @date 2022/3/17 20:27
 */
@Service
public class SavedFileServiceImpl implements SavedFileService {
    private MongoTemplate mongoTemplate;

    @Autowired
    public SavedFileServiceImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }


    @Override
    public String saveCsv(SavedFile file) {
        mongoTemplate.save(file, "savedFile");
        return file.getId();
    }

    @Override
    public String saveImage(SavedImage image) {
        mongoTemplate.save(image, "image");
        return image.getId();
    }

    @Override
    public SavedImage getImageById(String id) {
        return mongoTemplate.findById(id, SavedImage.class, "image");

    }

    @Override
    public SavedFile getCsvById(String id) {
        return mongoTemplate.findById(id, SavedFile.class, "savedFile");
    }
}
