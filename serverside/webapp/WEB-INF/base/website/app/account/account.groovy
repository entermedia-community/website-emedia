import org.entermediadb.asset.MediaArchive
import org.entermediadb.location.Position
import org.entermediadb.projects.*
import org.openedit.Data
import org.openedit.profile.UserProfile

import org.openedit.data.BaseSearcher
import org.openedit.data.Searcher

public void init()
{

	MediaArchive mediaArchive = context.getPageValue("mediaarchive");//Search for all files looking for videos
	
	BaseSearcher collectionsearcher = mediaArchive.getSearcher("librarycollection");
	UserProfile userprofile = context.getUserProfile();
	String  usercollectionid = userprofile.get("usercollection");
	Data usercollection = null;
	
	usercollection = collectionsearcher.searchById(usercollectionid);
	
	
	if(usercollection == null) {
		//create collection
		usercollection = collectionsearcher.createNewData();
		usercollection.setId(user.getId());
		usercollection.setValue("name", user.getName());
		usercollection.setValue("owner", user.getId());
		usercollection.setValue("library","userscollections");
		collectionsearcher.saveData(usercollection);
		userprofile.addValue("usercollection", usercollection.getId());
		log.info("User collection created");
		
		//add to librarycollectionusers
		BaseSearcher lcusearcher = mediaArchive.getSearcher("librarycollectionusers");
		Data lcu = lcusearcher.createNewData();
		lcu.setValue("collectionid",usercollection.getId());
		lcu.setValue("followeruser",user.getId());
		lcu.setValue("ontheteam",true);
		lcusearcher.saveData(lcu);
		
		//add client Support local user agent
		
		String localclientsupportuser = "dienekes";
		Data lcu2 = lcusearcher.createNewData();
		lcu2.setValue("collectionid",usercollection.getId());
		lcu2.setValue("followeruser", localclientsupportuser);
		lcu2.setValue("ontheteam",true);
		lcusearcher.saveData(lcu2);
		
		
		//Send Welcome Message
		BaseSearcher cbsearcher = mediaArchive.getSearcher("chatterbox");
		Data chat = cbsearcher.createNewData();
		chat.setValue("message", "Hello, I'm your account manager. Let me know if you have any questions.");
		chat.setValue("user", localclientsupportuser);
		chat.setValue("collectionid", usercollection.getId());
		chat.setValue("channel", usercollection.getId());
		cbsearcher.savedata(chat);
		
	}
	else {
		 
	}
	context.putPageValue("librarycol", usercollection);
	context.putPageValue("collectionid", usercollection.getId());
	
	//topic
	String defaultusertopic = user.getId();
	BaseSearcher topicsearcher = mediaArchive.getSearcher("collectiveproject");
	Data currenttopic = topicsearcher.query().exact("id", defaultusertopic).searchOne();
	if (currenttopic == null) {
		currenttopic = topicsearcher.createNewData();
		currenttopic.setValue("parentcollectionid",usercollection.getId())
		currenttopic.setName(defaultusertopic);
		currenttopic.setId(defaultusertopic);
		topicsearcher.saveData(currenttopic)
	}
	context.putPageValue("currenttopic", currenttopic);

}


init();