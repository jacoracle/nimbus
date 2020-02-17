package com.mimbus.service.util;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UploadFileService {
	
    
	private static final String upload_folder =  System.getProperty("user.home") + "/uploadingDir/";
	
	public String saveFile(MultipartFile file) {
		System.out.print("upload_folder: " + upload_folder);
			try {
				//Create Path
				StringBuilder builder = new StringBuilder();
				builder.append(System.getProperty("user.home"));
				builder.append(File.separator);
				builder.append("images");
				builder.append(File.separator);
				builder.append(file.getOriginalFilename());
				
				//Creating and Writing  File
				byte[] fileBytes = file.getBytes();
				Path path = Paths.get(builder.toString());
				Files.write(path, fileBytes);
				
				return builder.toString();
				
			 }catch(IOException e) {
				 
				return "Failed to store file " + e.getMessage();
		} 
	}
		
}


