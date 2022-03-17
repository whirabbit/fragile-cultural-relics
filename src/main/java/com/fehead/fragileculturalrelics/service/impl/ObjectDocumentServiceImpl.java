package com.fehead.fragileculturalrelics.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

/**
 * @author wrobby
 * @version 1.0
 * @date 2022/3/15 16:50
 */
@Service
public class ObjectDocumentServiceImpl {
    private MongoTemplate mongoTemplate;

    @Autowired
    public ObjectDocumentServiceImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

}
