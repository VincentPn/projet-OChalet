BACKUP_SERVER_SSH=
PATH_ON_BACKUP_SERVER=
BACKUP_SERVER_SSH_PORT=

green_text=`tput setaf 2`
red_text=`tput setaf 1`
reset_color=`tput sgr0`

touch ssh-check.sh && chmod +x ssh-check.sh
echo "ssh -o StrictHostKeyChecking=no -p $BACKUP_SERVER_SSH_PORT -q $BACKUP_SERVER_SSH exit" >> ssh-check.sh
echo 'if [ $? != "0" ]; then' >> ssh-check.sh
echo "echo 'failed'" >> ssh-check.sh
echo "else" >> ssh-check.sh
echo "echo 'established'" >> ssh-check.sh
echo 'fi' >> ssh-check.sh
SSHSTATUS=$( sh ssh-check.sh )

case $SSHSTATUS in

    [e]*) 
    echo "${green_text}SSH CONNECTION ESTABLISHED WITH YOUR BACKUP SERVER${reset_color}" 
    echo "rsync -avrhe \"ssh -p $BACKUP_SERVER_SSH_PORT\" /home/ $BACKUP_SERVER_SSH:$PATH_ON_BACKUP_SERVER" >> dump.sh
    ;;

    [fF]*) 
        echo "${red_text}SSH CONNECTION CANNOT BE ESTABLISHED WITH YOUR BACKUP SERVER${reset_color}"
        echo "${green_text}BUT EVERYTHING WORKING EXECPT SSH CONNECTION${reset_color}"
        ;;
    esac



