package com.fehead.fragileculturalrelics.service.impl;

import com.fehead.fragileculturalrelics.entity.BriefInfo;
import com.fehead.fragileculturalrelics.entity.ObjectDocument;
import com.fehead.fragileculturalrelics.entity.PostInfo;
import com.fehead.fragileculturalrelics.entity.SavedImage;
import com.fehead.fragileculturalrelics.service.ObjectDocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * @author wrobby
 * @version 1.0
 * @date 2022/3/15 16:50
 */
@Service
public class ObjectDocumentServiceImpl implements ObjectDocumentService {
    private MongoTemplate mongoTemplate;

    @Autowired
    public ObjectDocumentServiceImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<String> searchDocumentByTitle(String title) {
        Query query = new Query(Criteria.where("name").regex(".*" + title + ".*"));

        List<BriefInfo> info = mongoTemplate.find(query, BriefInfo.class, "info");
        List<String> ids = new ArrayList<>(info.size());
        info.forEach(e -> ids.add(e.getId()));
        return ids;
    }

    @Override
    public ObjectDocument getDocumentById(String id) {
        return mongoTemplate.findById(id, ObjectDocument.class, "document");
    }

    @Override
    public Boolean saveDocument(ObjectDocument document) {
        mongoTemplate.save(document, "document");
        return true;
    }

    @Override
    public Boolean saveDocumentInfo(PostInfo info) {
        BriefInfo in = new BriefInfo();
        in.setId(info.getId());
        in.setName(info.getName());
        in.setNumber(info.getNumber());
        in.setInfo(info.getInfo());
        in.setChemicalComposition(info.getChemicalComposition());
        SavedImage image = new SavedImage();
        try {
            image.setFile(info.getImage().getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
        mongoTemplate.save(image, "savedImage");
        in.setImage(image.getId());
        mongoTemplate.save(in, "info");
        return true;
    }

}
