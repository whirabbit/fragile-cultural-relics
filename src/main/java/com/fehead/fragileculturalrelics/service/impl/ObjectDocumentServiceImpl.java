package com.fehead.fragileculturalrelics.service.impl;

import com.fehead.fragileculturalrelics.entity.BriefInfo;
import com.fehead.fragileculturalrelics.entity.ObjectDocument;
import com.fehead.fragileculturalrelics.service.ObjectDocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public List<BriefInfo> searchDocumentByTitle(String title) {
        Query query = new Query(Criteria.where("name").regex(".*" + title + ".*"));
        List<BriefInfo> info = mongoTemplate.find(query, BriefInfo.class, "info");
//        List<String> ids = new ArrayList<>(info.size());
//        info.forEach(e -> ids.add(e.getId()));
        return info;
    }

    @Override
    public Map<String, Object> getDocumentById(String id) {
        Map<String, Object> map = new HashMap<>(2);
        map.put("document", mongoTemplate.findById(id, ObjectDocument.class, "document"));
        map.put("info", mongoTemplate.findById(id, BriefInfo.class, "info"));
        return map;
    }

    @Override
    public Boolean saveDocument(ObjectDocument document) {
        mongoTemplate.save(document, "document");
        return true;
    }

    @Override
    public Boolean saveDocumentInfo(BriefInfo info) {
//        BriefInfo in = new BriefInfo();
//        in.setId(info.getId());
//        in.setName(info.getName());
//        in.setNumber(info.getNumber());
//        in.setInfo(info.getInfo());
//        in.setChemicalComposition(info.getChemicalComposition());
//        SavedImage image = new SavedImage();
        mongoTemplate.save(info, "info");
        return true;
    }

}
