序列号seq：占4个字节，用来标记数据段的顺序，TCP把链接中发送的所有数据字节都编上一个序号，第一个字节的编号由本地随机产生；给字节编上序列号后，就给每一个报文段指派一个序号；序列号seq就是这个报文段中的第一个字节的数据编号。

确认号ack：占4个字节，期待收到对方下一个报文段的第一个数据字节的序列号；序列号表示报文段携带者数据的第一个字节的编号；而确认号指的是期望接收到下一个字节的编号；因此当前报文段最后一个字节的编号+1即为确认号。

确认号ACK：占1位，仅当ACK=1时，确认号字段才有效，ACK=0时，确认号无效。

同步SYN：连接建立时用于同步序号。当SYN=1，ACK=0时表示：这是一个连接请求报文段。若同意连接，则在响应报文段中使得SYN=1，ACK=1。因此，SYN=1表示这是一个连接请求，或连接接受报文。SYN这个标志位只有在TCP建立连接时才会被置1，握手完成后SYN标志位被置0。

终止FIN：用来释放一个连接。FIN=1表示：次报文段的发送方的数据已经发送完毕，并要求释放运输连接

PS：ACK、SYN和FIN这些大写的单词表示标志位，其值要么是1，要么是0；ack、seq小写的单词表示序号。




TCP连接：三次握手
1、客户端进程发出连接释放报文，并且停止发送数据。
2、服务器收到连接释放报文，发出确认报文。
3、客户端收到服务端的确认请求后，等待服务器发送连接释放报文
4、服务器将最后的数据发送完毕后，就向客户端发送连接释放报文。
5、客户端收到服务器的连接释放报文后，必须发出确认。
6、服务器只要收到了客户端发出的确认，立即进入CLOSED状态。



问答：
因为当Server端收到Client端的SYN连接请求报文后，可以直接发送SYN+ACK报文。其中ACK报文是用来应答的，SYN报文是用来同步的。但是关闭连接时，很可能并不会立即关闭SOCKET，所以只能先回复ACK报文，告诉Client端，“你发的FIN报文我收到了”。只有等到Server端所有的报文都发送完了，我才能发送FIN报文，因此不能一起发送。故需要四步握手。