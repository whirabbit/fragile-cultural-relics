package com.fehead.fragileculturalrelics.service;

import com.fehead.fragileculturalrelics.entity.SavedFile;
import com.fehead.fragileculturalrelics.entity.SavedImage;

/**
 * @author wrobby
 * @version 1.0
 * @date 2022/3/15 17:23
 */
public interface SavedFileService {


    /**
     * id获取对应csv
     *
     * @param file
     * @return
     */
    String saveCsv(SavedFile file);

    /**
     * id获取对应图片
     *
     * @param image
     * @return
     */
    String saveImage(SavedImage image);

    /**
     * id获取对应图片
     *
     * @param id
     * @return
     */
    SavedImage getImageById(String id);

    /**
     * id获取对应csv
     *
     * @param id
     * @return
     */
    SavedFile getCsvById(String id);
}
