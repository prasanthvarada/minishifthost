/*
 * Copyright 2016 codecentric AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.wipro;

import javax.validation.Valid;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.net.URISyntaxException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import com.wipro.Record;
import com.wipro.RecordRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.apache.log4j.Level;
import org.apache.log4j.Logger;

//import com.codahale.metrics.annotation.Timed;

//http://localhost:8080/dockerimg?git=https://github.com/codecentric/springboot-sample-app&baseimg=codecentric/springboot-maven3-centos&imgname=testimage

@Controller
@RequestMapping("/")
public class HomeController {

    private RecordRepository repository;
    private static final Logger LOG = Logger.getLogger(HomeController.class.getName());

    @Autowired
    public HomeController(RecordRepository repository) {
        this.repository = repository;
    }
/*
    @RequestMapping(method = RequestMethod.GET)
    public String home(ModelMap model) {
        List<Record> records = repository.findAll();
        model.addAttribute("records", records);
        model.addAttribute("insertRecord", new Record());
        return "home";
    }

    @RequestMapping(method = RequestMethod.POST)
    public String insertData(ModelMap model, 
                             @ModelAttribute("insertRecord") @Valid Record record,
                             BindingResult result) {
        if (!result.hasErrors()) {
            repository.save(record);
        }
        return home(model);
    }
    */
    
    @RequestMapping(method = RequestMethod.GET, value="/callcmds")
    //@Timed
    public ResponseEntity<StringBuffer> executeCommandsFile() throws URISyntaxException {
        
    	File file = new File("D:\\Pr364954\\E_Drive\\TechStuff\\Redhat\\mini\\mini_solutions\\minicmds.bat");
		StringBuffer output = new StringBuffer();

		Process p;
		try {
			//p = Runtime.getRuntime().exec("cmd /c start cmd.exe /K \" D:\\Pr364954\\E_Drive\\TechStuff\\Redhat\\mini\\mini_solutions\\minicmds.bat");
			//p = Runtime.getRuntime().exec("cmd /c start cmd.exe /K \" "+file );
			p = Runtime.getRuntime().exec(""+file );
			p.waitFor();
			
			//System.out.println("value is: ----------"+p.exitValue());
			BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
			
			BufferedReader stdError = new BufferedReader(new InputStreamReader(p.getErrorStream()));
			
			String line = "";			
			while ((line = reader.readLine())!= null) {
				output.append(line + "\n");
				System.out.println(line); //uncomment
			}
			
			System.out.println("~~~~Here is the standard errors of the command (if any):\n");
			while ((line = stdError.readLine()) != null) {
			    System.out.println("error line:"+line);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		//return output.toString();`

    	return new ResponseEntity<StringBuffer>(output, HttpStatus.OK);
    }
    
  //  @RequestMapping(method = RequestMethod.GET, value="/hostapp/{proj}/{app}/{type}/{path}")
    @RequestMapping(method = RequestMethod.GET, path="/hostapp", produces="text/plain")
    public @ResponseBody String getHostApplication(@RequestParam("proj") String proj, @RequestParam("app") String app,
    		@RequestParam("type") String type, @RequestParam("git") String git) throws URISyntaxException {
    	
    /*public ResponseEntity<String> getHostApplication(@RequestParam("proj") String proj, @RequestParam("app") String app,
    		@RequestParam("type") String type, @RequestParam("git") String git) throws URISyntaxException {*/
        
    	//File file = new File("D:\\Pr364954\\E_Drive\\TechStuff\\Redhat\\mini\\mini_solutions\\minicmds.bat");
    	//String cmd = "oc project "+proj;
    	System.out.println("came to hostapp for logging");
    	LOG.log(Level.INFO, "/came to hostapp for logging one");
    	LOG.log(Level.INFO, "/came to hostapp for logging two"+"again");
    	
    	System.out.println("values are: "+proj +" and "+app+" and "+type+" and "+git);
    	
    	String[] command = new String[3];
        command[0] = "cmd";
        command[1] = "/c";
        //command[2] = "oc projects && oc get is && oc whoami";
        command[2] = "oc new-project "+proj+"&& oc new-app codecentric/springboot-maven3-centos~"+git+" --name="+app;
    	
        StringBuffer output = new StringBuffer();
        String outputFile = "";

		Process p;
		try {
			//p = Runtime.getRuntime().exec("cmd /c start cmd.exe /K \" D:\\Pr364954\\E_Drive\\TechStuff\\Redhat\\mini\\mini_solutions\\minicmds.bat");
			//p = Runtime.getRuntime().exec("cmd /c start cmd.exe /K \" "+file );
			p = Runtime.getRuntime().exec(command);
			//p.waitFor();
			
			BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
			BufferedReader stdError = new BufferedReader(new InputStreamReader(p.getErrorStream()));
			
			String line = "";		
			output.append("The command is: "+Arrays.toString(command) + "\n");
			while ((line = reader.readLine())!= null) {
				output.append(line + "\n");
				//System.out.println(line); //uncomment
			}
			
			output.append("~~~~Here is the standard errors of the command (if any):\n");
			while ((line = stdError.readLine()) != null) {
				output.append("error line:"+line);
			}
			p.waitFor();
					
			outputFile = logContent("hosting", output.toString());
			String outputStr = output.toString();
			LOG.log(Level.INFO, outputStr);
			//LOG.log(Level.INFO, "/Host Application logs: - > " + output.toString());
			System.out.println("output file name is: "+outputFile);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return outputFile; 
    	//return new ResponseEntity<String>("Proj Creation submitted", HttpStatus.OK); //send outputFilename
    }
    
    @RequestMapping(method = RequestMethod.GET, path="/dockerimg", produces="text/plain")
    public @ResponseBody String getDockerImage(@RequestParam("git") String git, @RequestParam("baseimg") String baseimg, 
    		@RequestParam("imgname") String imgname) throws URISyntaxException {
    /*public ResponseEntity<StringBuffer> getDockerImage(@RequestParam("git") String git, @RequestParam("baseimg") String baseimg, 
    		@RequestParam("imgname") String imgname) throws URISyntaxException {
    */    
    	System.out.println("git, baseimg, imgname values are: "+git +" and "+baseimg+" and "+imgname);
    	String command = "cmd /c start cmd.exe /K \"echo s2i build process... && s2i build "+git+" "+baseimg+" "+imgname+" 1>> logtestone.txt 2>>&1 \"";
    	System.out.println("The command is: "+command);
    	LOG.log(Level.INFO, "/Docker image logs:: command is: - > " + command);
        
        StringBuffer output = new StringBuffer();
        DateFormat dflog = new SimpleDateFormat("yyyyMMddhhmmss");
        String reqid = dflog.format(new Date());
		Process p;
		try {
			//p = Runtime.getRuntime().exec("cmd /c start cmd.exe /K \" D:\\Pr364954\\E_Drive\\TechStuff\\Redhat\\mini\\mini_solutions\\minicmds.bat");
			//p = Runtime.getRuntime().exec("cmd /c start cmd.exe /K \" "+file );
			System.out.println("Building the Image process started...");
			p = Runtime.getRuntime().exec(command);
			//p.waitFor();
			
			BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
			BufferedReader stdError = new BufferedReader(new InputStreamReader(p.getErrorStream()));
			
			String line = "";		
			//output.append(Arrays.toString(command) + "\n");
			//output.append(command +"\n");
			/*while ((line = reader.readLine())!= null) {
				output.append(line + "\n");
				System.out.println(line); //uncomment
			}
			*/
			/*output.append("~~~~Here is the standard errors of the command (if any):\n");
			System.out.println("~~~~Here is the standard errors of the command (if any):\n");
			while ((line = stdError.readLine()) != null) {
				output.append("error line:"+line);
				//System.out.println("error line:"+line);
			}*/
			//logContent(output.toString());
			System.out.println("s2i build request submitted.... with reqId:"+reqid);
			output.append("s2i build request submitted...... with reqId:"+reqid);
			p.waitFor();
			if(p.exitValue() == 0)
				output.append("Process Done already");
			logContent("s2i", output.toString());
			LOG.log(Level.INFO, "/create docker s2i image - > " + output.toString());
			p.destroy();
		} catch (Exception e) {
			e.printStackTrace();
			logContent("s2i", e.toString()); 
		}
		return "s2i build request submitted... with requestId: "+reqid;
    	//return new ResponseEntity<StringBuffer>(output, HttpStatus.OK);
    }
    
    @RequestMapping(method = RequestMethod.GET, path="/pushimg", produces="text/plain")
    public @ResponseBody String pushImgage(@RequestParam("img") String img, @RequestParam("proj") String proj, @RequestParam("targetimg") String targetimg) throws URISyntaxException {
            
    	System.out.println("img, proj, targetimg values are: "+img +" and "+proj+" and "+targetimg);
    	String ipadd = "172.30.1.1:5000/";
       	//String command = "cmd /c start cmd.exe /K \"docker tag "+img+" "+ipadd+proj+"/"+targetimg+" && docker push "+ipadd+proj+"/"+targetimg+"\"";
    	String cmd1 = "docker tag "+img+" "+ipadd+proj+"/"+targetimg;
    	String cmd2 = "docker push "+ipadd+proj+"/"+targetimg;
    	//String command = "docker tag "+img+" "+ipadd+proj+"/"+targetimg+" && docker push "+ipadd+proj+"/"+targetimg;
       	//String command = "cmd /c start cmd.exe /K \"echo pushing the image... && "+cmd1+" && "+cmd2+" \"";
    	//String command = "cmd /c echo pushing the image... && "+cmd1+" && "+cmd2+" \"";
    	String command = "cmd /c start cmd.exe /K \"echo pushing the image... && "+cmd1+" && "+cmd2+" 1>> logtestone.txt 2>>&1 \"";
       	System.out.println("The command is : "+command);
       	LOG.log(Level.INFO, "/Push image logs:: command is: - > " + command);
       	
        StringBuffer output = new StringBuffer();
        
        DateFormat dflog = new SimpleDateFormat("yyyyMMddhhmmss");
        String reqid = dflog.format(new Date());
		Process p;
		try {
			System.out.println("Publishing the Image process started...");
			LOG.log(Level.INFO, "Publishing the Image process started...");
			p = Runtime.getRuntime().exec(command);
			//p.waitFor();
			System.out.println("Image push request submitted.... with reqId:"+reqid);
			output.append("Image push request submitted...... with reqId:"+reqid);
			p.waitFor();
			if(p.exitValue() == 0)
				output.append("Process submission Done");
			logContent("publish", output.toString());
			LOG.log(Level.INFO, "/push image - > " + output.toString());
			p.destroy();
		} catch (Exception e) {
			e.printStackTrace();
			logContent("pubilsh", e.toString()); 
		}
    	//return new ResponseEntity<StringBuffer>(output, HttpStatus.OK);
		return "Image push request submitted...... with requestId:"+reqid;
    }
    
    @RequestMapping(method = RequestMethod.GET, path="/pullimg", produces="text/plain")
    public @ResponseBody String pullImgage(@RequestParam("importimg") String importimg, @RequestParam("registry") String registry, @RequestParam("ocproj") String ocproj) throws URISyntaxException {
     
    	System.out.println("img, registry, proj values are: "+importimg +" and "+registry+" and "+ocproj);
    	String command = "cmd /c echo pull image process started... && oc project "+ocproj+" && oc import-image "+importimg+" --from="+registry+" --confirm"+" 1>> logtestone.txt 2>>&1 \"";
       	System.out.println("The command is : "+command);
        
        StringBuffer output = new StringBuffer();
        
        DateFormat dflog = new SimpleDateFormat("yyyyMMddhhmmss");
        String reqid = dflog.format(new Date());
		Process p;
		try {
			System.out.println("Pulling the Image process started...");
			LOG.log(Level.INFO, "Pulling the Image process started...");
			p = Runtime.getRuntime().exec(command);
			//p.waitFor();
			
			System.out.println("Image Pull request submitted.... with reqId:"+reqid);
			output.append("Image Pull request submitted...... with reqId:"+reqid);
			p.waitFor();
			if(p.exitValue() == 0)
				output.append("Process submission Done");
			logContent("Pull", output.toString());
			LOG.log(Level.INFO, "/pull image - > " + output.toString());
			p.destroy();
		} catch (Exception e) {
			e.printStackTrace();
			logContent("pull", e.toString()); 
		}
    	//return new ResponseEntity<StringBuffer>(output, HttpStatus.OK);
		return "Image Pull request submitted...... with requestId:"+reqid;
    }
    
    @RequestMapping(method = RequestMethod.GET, path="/cicd", produces="text/plain")
    public @ResponseBody String getPipeline(@RequestParam("filepath") String filepath, @RequestParam("proj") String proj) throws URISyntaxException {
    	System.out.println("values are: "+filepath +" and "+proj);
    	
    	String[] command = new String[3];
        command[0] = "cmd";
        command[1] = "/c";
        //command[2] = "oc projects && oc get is && oc whoami";
        command[2] = "oc project "+proj+"&& oc create -f "+filepath;
    	
        StringBuffer output = new StringBuffer();
        String outputFile = "";

		Process p;
		try {
			p = Runtime.getRuntime().exec(command);
			//p.waitFor();
			
			BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
			BufferedReader stdError = new BufferedReader(new InputStreamReader(p.getErrorStream()));
			
			String line = "";		
			output.append(Arrays.toString(command) + "\n");
			while ((line = reader.readLine())!= null) {
				output.append(line + "\n");
				//System.out.println(line); //uncomment
			}
			
			output.append("~~~~Here is the standard errors of the command (if any):\n");
			while ((line = stdError.readLine()) != null) {
				output.append("error line:"+line);
			}
			p.waitFor();
					
			outputFile = logContent("pipeline", output.toString());
			LOG.log(Level.INFO, "/Pipeline Creation - > " + output.toString());
			System.out.println("output file name is: "+outputFile);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return outputFile; 
    }
    
    @RequestMapping(method = RequestMethod.GET, path="/dockerrun", produces="text/plain")
    public @ResponseBody String dockerRun(@RequestParam("img") String img) throws URISyntaxException {
     
    	System.out.println("img is: "+img );
    	String command = "cmd /c start cmd.exe /K \"echo docker run started... && docker run -ti --rm --name server -p 9091:8080 "+img+ " \"";
       	System.out.println("The command is : "+command);
        
        StringBuffer output = new StringBuffer();
        
        DateFormat dflog = new SimpleDateFormat("yyyyMMddhhmmss");
        String reqid = dflog.format(new Date());
		Process p;
		try {
			System.out.println("Docker run process started...");
			LOG.log(Level.INFO, "Docker run process started...");
			p = Runtime.getRuntime().exec(command);
			//p.waitFor();
			
			System.out.println("Docker run started.... with reqId:"+reqid);
			output.append("Docker run started...... with reqId:"+reqid);
			p.waitFor();
			if(p.exitValue() == 0)
				output.append("Process submission Done");
			logContent("Pull", output.toString());
			LOG.log(Level.INFO, "/docker run - > " + output.toString());
			p.destroy();
		} catch (Exception e) {
			e.printStackTrace();
			logContent("pull", e.toString()); 
		}
    	//return new ResponseEntity<StringBuffer>(output, HttpStatus.OK);
		return "Docker run started...... with requestId:"+reqid;
    }

    private String logContent(String filename, String output)
	{
		//String FILE_PATH = "D:\\Pr364954\\E_Drive\\TechStuff\\Redhat\\mini\\mini_solutions\\logfiles\\";
    	String FILE_PATH = "D:\\Pr364954\\E_Drive\\JHipster\\genbuilds\\minishifthost\\src\\main\\webapp\\logs\\";
		DateFormat df = new SimpleDateFormat("yyyyMMddhhmmss"); // add S if you need milliseconds
		String fileTmstmp = filename+ df.format(new Date()) + ".txt";
		String outputFile = FILE_PATH +fileTmstmp;
		//String outputFile = FILE_PATH +filename+ df.format(new Date()) + ".txt";
		try (BufferedWriter bw = new BufferedWriter(new FileWriter(outputFile))) {
			bw.write(output);
			
		//	LOG.log(Level.INFO, "/elkdemo - > " + response);
	}catch(Exception e)
		{
			e.printStackTrace();
		}
		//return outputFile;
		return fileTmstmp;
	}

    
    
    /*    //For Error scenario only its capturing on the server console, since its output is faster.
    @RequestMapping(method = RequestMethod.GET, path="/dockerimgone", produces="text/plain")
    public @ResponseBody String getDockerImageOne(@RequestParam("git") String git, @RequestParam("baseimg") String baseimg, 
    		@RequestParam("imgname") String imgname) throws URISyntaxException {
    	System.out.println("git, baseimg, imgname values are: "+git +" and "+baseimg+" and "+imgname);
    	
    	
    	String command = "cmd /c echo s2i build process... && s2i build "+git+" "+baseimg+" "+imgname;
    	System.out.println("The command is: "+command);
        
        StringBuffer output = new StringBuffer();
        DateFormat dflog = new SimpleDateFormat("yyyyMMddhhmmss");
        String reqid = dflog.format(new Date());
		Process p;
		try {
			System.out.println("Building the Image process started...");
			p = Runtime.getRuntime().exec(command);
			//p.waitFor();
			
			BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
			BufferedReader stdError = new BufferedReader(new InputStreamReader(p.getErrorStream()));
			
			String line = "";		
			//output.append(Arrays.toString(command) + "\n");
			output.append(command +"\n");
			while ((line = reader.readLine())!= null) {
				System.out.println(line); //uncomment
				output.append(line + "\n");
			}
			
			output.append("~~~~Here is the standard errors of the command (if any):\n");
			System.out.println("~~~~Here is the standard errors of the command (if any):\n");
			while ((line = stdError.readLine()) != null) {
				System.out.println("error line:"+line);
				output.append("error line:"+line);
			}
		
			System.out.println("s2i build request submitted.... with reqId:"+reqid);
			output.append("s2i build request submitted...... with reqId:"+reqid);
			p.waitFor();
			logContent("s2ibuild", output.toString());
			p.destroy();
		} catch (Exception e) {
			e.printStackTrace();
			logContent("s2ibuild", e.toString()); 
		}
		return "s2i build request submitted... with requestId: "+reqid;
    	//return new ResponseEntity<StringBuffer>(output, HttpStatus.OK);
    }
*/    
    
}
