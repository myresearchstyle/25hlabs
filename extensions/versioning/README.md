# Versioning for [Symphony CMS][1]
## Entry versioning and recycling


### Please read this first:
This is an expeimental release, that is meant for community testing. Please do not use this extension for production environments (yet).

### So, what is it good for?
This extensions tries to provide a tool to improve your daily redactional workflow with [Symphony CMS][1] by adding the ability to save entry as versions.

Versions are stored in a seperate database table and can be previewed at any time. Once you my have previewed a former entry version and have decided to restore it, just hit the restore button and you are done.

### Do I need to keep all versions I have created?
No, you don’t. You can pick certain versions and delete them or delete them all at once. (Note: deleting versions is not recoverable).

### You said, deleting versions is not recoverable. So, deleting entries is?
Yepp. Deleted Entries are stored in the versions table and marked as deleted.

Deleted entries are shown in a drawertable on you publish index pages. You my pick a particular deleted entry form here and restore it. All versions that were saved with this entry are restored as well.

### Ok, you got my attention. Give me more

Hold on, there is still much work to do. But stay tuned :)  

[1]: http://symphony-cms.com