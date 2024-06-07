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
	if(usercollectionid == null) {
		//create collection
		usercollection = collectionsearcher.createNewData();
		usercollection.setId(user.getId());
		usercollection.setValue("owner", user.getId());
		usercollection.setValue("library","userscollections");
		collectionsearcher.saveData(usercollection);
		userprofile.addValue("usercollection", usercollection.getId());
		log.info("User collection created");
		
	}
	else {
		 usercollection = collectionsearcher.searchById(usercollectionid);
	}
	context.putPageValue("collection", usercollection);
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