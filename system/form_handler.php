<?php 

if($_POST) {
	$data['status'] = 'OK';

	if($_POST['user_name']) $data['user_name'] = trim( $_POST['user_name'] );			
	if($_POST['user_phone']) $data['user_phone'] = trim( $_POST['user_phone'] );					
	if($_POST['user_email']) $data['user_email'] = trim( $_POST['user_email'] );	

	// $data['user_name'] = $_POST['user_name'];
	// $data['user_phone'] = $_POST['user_phone'];
	// $data['user_email'] = $_POST['user_email'];
	// $data['form_descr'] = $_POST['form_descr'];
	// $data['name'] = $_POST['name'];

		if( !empty( $data['user_name'] ) and !empty( $data['user_phone'] ) and !empty( $data['user_email'] )) {
			
			// if( preg_match("/([a-z0-9_]+|[a-z0-9_]+\.[a-z0-9_]+)@(([a-z0-9]|[a-z0-9]+\.[a-z0-9]+)+\.([a-z]{2,4}))/i", $arr['email']) )
			// {

			// }

				$to = 'freerun-2012@yandex.ru'; /* 21arenda@gmail.com */
				$sitename = $_SERVER['HTTP_HOST'];
				$subject = "Заявка от клиента: " . $_POST['form_descr'];
				$message = "Имя пославшего: " .$data['user_name'] .  "\r\nТелефон: " . $data['user_phone'] . "\r\nE-mail: " .$data['user_email'];
				$headers = "From: {$sitename} <" .$_POST['user_email']. ">\r\nContent-type:text/plain; charset=utf-8\r\n";
				mail($to,$subject,$message,$headers);
				echo json_encode($data);
		}
		else{
			$data['status'] = 'empty_fields'; 
			echo json_encode($data);
		 }
}
else{
	$data['status'] = 'nodata';
	echo json_encode($data);
}

//print_r($_POST);

?>
