package com.fehead.fragileculturalrelics;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;

@SpringBootTest
class FragileCulturalRelicsApplicationTests {
@Autowired
    MongoTemplate template;
    @Test
    void contextLoads() {
        template.save("nihao","string");
    }

}
