package com.mimbus.web.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.mimbus.service.util.UploadFileService;
import java.util.logging.*;

import com.mimbus.security.AuthoritiesConstants;


@RestController
@RequestMapping("/api")
public class UploadFileResource {
	

	@Autowired
    private UploadFileService uploadFileService;
	
	@PostMapping("/uploadFile")
	@PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
	public String  uploadFile( @RequestParam("file") MultipartFile file) {
		
		String path = "";
		if (!file.isEmpty()) {
			path = uploadFileService.saveFile(file);
		} else {
			path = "Load Failed, Try again";
		}
	  return path;
	}
	 
}
