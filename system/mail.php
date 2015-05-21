<?php
function back_call(){
	
		if($_POST['name']) $arr['name'] = trim($_POST['name']);			
		if($_POST['email']) $arr['email'] = trim($_POST['email']);					
		if($_POST['message']) $arr['message'] = trim($_POST['message']);	
			
		if( !empty($arr['name']) and !empty($arr['email']) and !empty($arr['message'])) {
			
			if( preg_match("/([a-z0-9_]+|[a-z0-9_]+\.[a-z0-9_]+)@(([a-z0-9]|[a-z0-9]+\.[a-z0-9]+)+\.([a-z]{2,4}))/i", $arr['email']) )
			{

				$to = 'freerun-2012@yandex.ru'; /* 21arenda@gmail.com */
				$sitename = $_SERVER['HTTP_HOST'];
				$subject = "Заявка от клиента";
				$message = "Имя пославшего: " .$arr['name'].  "\r\nСообщение: \r\n" . $arr['message'];
				$headers = "From: {$sitename} <" .$arr['email']. ">\r\nContent-type:text/plain; charset=utf-8\r\n";
				mail($to,$subject,$message,$headers);
				$arr['res'] = 'success';
				echo json_encode($arr); 
			}
		}
		else{
			$arr['res'] = 'error'; 
			echo json_encode($arr);
		 }
}
back_call();
?>