<?
	$name = $_POST["name"];
	$title = $_POST["title"];
	$description = $_POST["description"];
	$email = $_POST["email"];
	$message = "Name: $name<br />Title: $title<br />Description: $description<br />Email: $email";

	$to = 'exhibit@hand.gallery';
	$subject = 'Exhibition submission';

	//*** Uniqid Session ***//
	$id = md5(uniqid(time()));

	$header = "";
	$header .= "From: Hand Exhibition submission ";

	$header .= "MIME-Version: 1.0\n";
	$header .= "Content-Type: multipart/mixed; boundary=\"".$id."\"\n\n";
	$header .= "This is a multi-part message in MIME format.\n";

	$header .= "--".$id."\n";
	$header .= "Content-type: text/html; charset=utf-8\n";
	$header .= "Content-Transfer-Encoding: 7bit\n\n";
	$header .= $message."\n\n";

	//*** Attachment ***//
	if($_FILES["fileAttach"]["name"] != "")  {
		$filesName = $_FILES["fileAttach"]["name"];
		$content = chunk_split(base64_encode(file_get_contents($_FILES["fileAttach"]["tmp_name"])));
		$header .= "--".$id."\n";
		$header .= "Content-Type: application/octet-stream; name=\"".$filesName."\"\n";
		$header .= "Content-Transfer-Encoding: base64\n";
		$header .= "Content-Disposition: attachment; filename=\"".$filesName."\"\n\n";
		$header .= $content."\n\n";
	}

	$flgSend = @mail($to,$subject,$message,$header);  // @ = No Show Error //

	if($flgSend)  {
		header("Location: ../upload_exhibition_complete/");
	}  else  {
		echo "Cannot send mail.";
	}
?>