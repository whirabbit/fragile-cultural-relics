package com.fehead.fragileculturalrelics;

import com.fehead.fragileculturalrelics.entity.BriefInfo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

@SpringBootTest
class FragileCulturalRelicsApplicationTests {
    @Autowired
    MongoTemplate template;

    @Test
    void contextLoads() {
        template.save("nihao", "info");
    }

    @Test
    void search() {
        List<BriefInfo> list = template.find(
                new Query(Criteria.where("name").regex(".*?" + "jt" + ".*")), BriefInfo.class, "info");
        System.out.println(list);
    }

}
