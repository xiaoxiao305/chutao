class Common{
	constructor() {
	}
	GetHealthScore(profile) {
	   var bmi=(profile.weight*100*100)/ Math.pow(profile.height,2);
	   var count=0;
	    if(bmi<=0) count=0
		else if(bmi <=22 && bmi>=20) count=98
		else{
			var c=0
			for(var i=0;i<100;i++){
				c=i*4
				if(bmi <=23+i && bmi>22+i){
					count=94-c
					break;
				}
			}
		} 
	   return count 
	}
	GetAnswer(profile){
		//每周运动次数2：<2次 1：>2次
		// ExerciseTimesWeek int `json:"exercise_times_week"`
		// //每周有氧运动时间 1：<30min 2：30min~60min 3:>60min
		// OxyTimeWeek int `json:"oxy_time_week"`
		// //年龄
		// Age int `json:"age"`
		// //身高
		// Height int `json:"height"`
		// //体重
		// Weight int `json:"weight"`
		// //体态 1:瘦弱  2：较瘦 3：标准 4：偏胖 5：肥胖
		// Shape int `json:"shape"`
		// //皮肤 1：气色很好 2：皮肤暗淡 3：皮肤脆弱 有创口或皮下出血
		// Skin int `json:"skin"`
		var result={"answer":"","suggest":""}
		//每周运动次数<2次 每周有氧运动时间<30min
		if(profile.exercise_times_week==2 && profile.oxy_time_week==1){
			  result.answer="运动次数及时间都不足。";
			  result.suggest="建议先增加运动量，同时配合新人左旋肉碱产品增加运动效果。"
		}else{
			if(profile.shape==1){//体态 1:瘦弱
				if(profile.skin==1){	//皮肤 1气色很好
					result.answer="您的气色很好，身材上结合针对性的运动是可以变的让很多人羡慕的。";
					result.suggest="除了加强全面的营养摄入，找到营养吸收障碍等可能存在的问题，有针对性的运动时长及运动项目，可以帮助您增加体重，同时控制BIM。"
				}else if(profile.skin==2){ //皮肤 2：皮肤暗淡 
					result.answer="以您的运动量，皮肤暗淡，可能是缺乏维生素B族，例如动物肝脏，菠菜，新鲜牛奶等摄入量不足，及维生素C，L-抗坏血酸不足导致的。除了加强全面的营养摄入，找到营养吸收障碍等可能存在的问题。";
					result.suggest="推荐您这份VC指南 焕亮肌肤茶每日补充2颗，搭配有针对性的运动时长及运动项目，可以帮助您增加体重，同时控制BIM，相信会让人有惊喜的效果。"
				}else if(profile.skin==3){ //皮肤  3：皮肤脆弱 有创口或皮下出血
					result.answer="以您的运动量，皮肤问题您很可能平时的肉类蛋白摄入量不足，建议您可以多摄入新鲜海鱼，瘦肉类，新鲜奶制品。";
					result.suggest="除了加强全面的营养摄入，找到营养吸收障碍等可能存在的问题，有针对性的运动时长及运动项目，可以帮助您增加体重，同时控制BIM。"
				}
			}else if(profile.shape==2){ //体态 2：较瘦
				if(profile.skin==1){//皮肤 1气色很好
					result.answer="恭喜您小达人，您的气色很好，身材上结合针对性的运动是可以变的让很多人羡慕的。除了加强全面的营养摄入，有针对性的运动时长及运动项目，可以帮助您增加肌肉含量的同时控制BIM。";
					result.suggest="推荐出桃指南-小达人运动套装运动补水的同时，增加您的运动效果0代糖 0香精更健康。"
				}else if(profile.skin==2){ //皮肤 2：皮肤暗淡 
					result.answer="以您的运动量，皮肤暗淡，可能是缺乏维生素B例如动物肝脏，菠菜，新鲜牛奶等摄入量不族足，及维生素C，L-抗坏血酸不足导致的。";
					result.suggest="除了加强全面的营养摄入推荐您这份VC指南 焕亮肌肤茶每日补充2颗，搭配有针对性的运动时长及运动项目，可以帮助您增加体重，同时控制BIM，相信会让人有惊喜的效果。"
				}else if(profile.skin==3){ //皮肤  3：皮肤脆弱 有创口或皮下出血
					result.answer="以您的运动量，皮肤问题您很可能平时的肉类蛋白摄入量不足，建议您可以多摄入新鲜海鱼，瘦肉类，新鲜奶制品。";
					result.suggest="除了加强全面的营养摄入，找到营养吸收障碍等可能存在的问题，有针对性的运动时长及运动项目，可以帮助您增加体重，同时控制BIM。推荐出桃指南-小达人运动套装运动补水的同时，增加您的运动效果.0代糖 0香精更健康。"
				}
			}else if(profile.shape==3){ //体态 3：标准
				if(profile.skin==1){//皮肤 1气色很好
					result.answer="首先恭喜您小达人，您已经超越了95%的人群您的气色很好，身材上也让很多人羡慕。";
					result.suggest="除了保持目前全面的营养摄入外，有针对性的运动时长及运动项目，可以帮助您增加肌肉含量的同时控制BIM。推荐出桃指南-小达人运动套装运动补水的同时，增加您的运动效果.0代糖 0香精更健康。"
				}else if(profile.skin==2){ //皮肤 2：皮肤暗淡 
					result.answer="首先恭喜您小达人，您已经超越了90%的人群同时以您的运动量，皮肤暗淡，可能是缺乏维生素B族，例如动物肝脏，菠菜，新鲜牛奶等摄入量不足，及维生素C ，L-抗坏血酸不足导致的。";
					result.suggest="除了加强全面的营养摄入,推荐您:1.VC指南 焕亮肌肤茶每日补充2颗，搭配有针对性的运动时长及运动项目，可以帮助您恢复好气色。2.推荐您出桃指南-小达人运动套装运动补水的同时，增加您的运动效果0代糖 0香精更健康。增加体重，同时控制BIM，相信会让人有惊喜的效果。"
				}else if(profile.skin==3){ //皮肤  3：皮肤脆弱 有创口或皮下出血
					result.answer="以您的运动量，皮肤问题您很可能平时的肉类蛋白摄入量不足，建议您可以多摄入新鲜海鱼，瘦肉类，新鲜奶制品。";
					result.suggest="除了加强全面的营养摄入，找到营养吸收障碍等可能存在的问题，有针对性的运动时长及运动项目，可以帮助您增加体重，同时控制BIM。推荐出桃指南-小达人运动套装运动补水的同时，增加您的运动效果.0代糖 0香精更健康。"
				}
			}else if(profile.shape==4 || profile.shape==5){ //体态 4：偏胖  5：肥胖
				result.answer="您的气色很好，身材上结合针对性的运动是可以变的让很多人羡慕的。";
				result.suggest="除了加强全面的营养摄入，找到营养吸收障碍等可能存在的问题，有针对性的运动时长及运动项目，可以帮助您增加体重，同时控制BIM。"
			}
		}
		return result
	  }
 }
 export default  Common=new Common()