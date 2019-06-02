package matimatiks.matimatiks;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.app.ProgressDialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.media.MediaPlayer;
import android.os.Build;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.os.Parcel;
import android.os.Parcelable;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.ImageButton;
import android.widget.ListView;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.ListIterator;
import java.util.Map;


/**
 * Created by ridwan on 9/6/2016.
 */
public class Questions extends AppCompatActivity implements RandomGen {
    /**
     * Variable declaration
     **/
    private TouchImageView B_Image;
    private RadioGroup options;
    private RadioButton rb;
    private RelativeLayout relativeLayout;
    private ImageButton previous, next;
    private Button view;
    private ProgressDialog progress;
    public static int count, attempt = 0;
    private DatabaseReference databaseReference;
    public static int frag, type, mode, Randoms, Rand_ans, num;
    private byte[] bytes;
    private ArrayList<Integer> id;
    private ArrayList<Integer> rand;
    public  ArrayList<Boolean> status;
    private ListIterator<Integer> Ilist, Alist;
    private ArrayList<Integer> Qlist;
    private ArrayList<String> arr;
    public static int NOF, tapcount = 0, Score = 0;
    private StorageReference storageRef;
    private ArrayList<String> names;
    private static String ans = "";
    private ArrayList<Boolean> A_value, visited;
    private boolean v_iew, done, start, clear, b_click, complete;
    private FirebaseAuth firebaseAuth;
    private MediaPlayer mediaPlayer;
    private ArrayList<Integer> list;
    private LinkedList<ArrayList<Integer>> LIST;
    public boolean reviewed = false;// seen;
    public boolean isPaused = false, isCanceled =false;
    private static  boolean Finish = false, back = false;
    //Declare a variable to hold count down timer's paused status
    //Declare a variable to hold CountDownTimer remaining time
    private long timeRemaining = 0;
    private  int hours, minutes, seconds;
    private TextView time;
    private Map<Integer,Boolean> map;

    /**
     * Dummy arraylist
     **/

    private ArrayList<Integer> tmp;



    /**
     * method called when the activity is created
     *
     * @param savedInstanceState: Contents of the activity
     */
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent intent = getIntent();// gets content of intent sent

        setContentView(R.layout.activity_question); //Attaching the activity layout


        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = getWindow();
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(getResources().getColor(R.color.company_color));
        }

        count = 1;



        time  = findViewById(R.id.time);

        /** initializes all data collected from the intent**/
        bytes = intent.getByteArrayExtra("DATA");
        frag = intent.getIntExtra("FRAG", -1);
        type = intent.getIntExtra("TYPE", -1);
        mode = intent.getIntExtra("MODE", -1);
        rand = intent.getIntegerArrayListExtra("RAND");



        /** initializing firebase call variable**/
        storageRef = FirebaseStorage.getInstance().getReference();
        firebaseAuth = FirebaseAuth.getInstance();
        databaseReference = FirebaseDatabase.getInstance().getReference();

        /** Views initailization**/
        B_Image = (TouchImageView) findViewById(R.id.quest);
        options = (RadioGroup) findViewById(R.id.options);
        rb = (RadioButton) options.findViewById(options.getCheckedRadioButtonId());
        relativeLayout = (RelativeLayout) findViewById(R.id.QandA);
        previous = (ImageButton) findViewById(R.id.prev);
        next = (ImageButton) findViewById(R.id.nxt);
        view = (Button) findViewById(R.id.view);

        clear = false;
        done = false;
        b_click = false;
        //start = false;
        complete = true;


        if(mode == 2)
            NOF = 50;
        else
            NOF = 2;


        arr = new ArrayList<>();
        map = new HashMap<>();



        //if it is read-through mode don't display option button
        if (mode == 0)
            options.setVisibility(View.INVISIBLE);


        /** Array list that stores the T/F values of each question whether the page has been visited or not**/
        status = new ArrayList<>();

        /** Array list that stores the T/F values of each question according to right or wrong answer**/
        A_value = new ArrayList<>();

        id = new ArrayList<>();

        /** Arraylist that stores the generated random number values **/
        Qlist = new ArrayList<>();

        visited = new ArrayList<>();


        /**Initialize dummy Arraylist **/
        tmp = new ArrayList<>();


        /** initialize above array lists to be false**/
        tempArrayList(status);
        tempArrayList(A_value);
        tempArrayList(visited);
        tempArrayint(id);



        getFile(bytes); // call to display the file recieved



        /** Generate Random numbers for the questions **/
        randomNum(NOF);

        names = new ArrayList<>();

        ViewAnswer(); //Call to view answer button


        LIST = new LinkedList<>();


        if (mode == 2) {
            SetTimer();


            if (!STATUS()) {
                for(int i = 0; i<NOF; i++) {
                    list = new ArrayList<>();
                    LIST.add(list);
                }
        }


        }


        if (clear)
            id.clear();


        /**
         *
         */
        options.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @SuppressLint("ResourceType")
            @Override
            public void onCheckedChanged(RadioGroup group, int checkedId) {

                rb =  group.findViewById(checkedId);

                if (rb != null) {
                    if (rb.isChecked()) {
                        status.set(count - 1, true);
                    }


                   /* Toast.makeText(getApplicationContext(), "A " + STATUS(), Toast.LENGTH_SHORT).show();
                    Toast.makeText(getApplicationContext(), "C " + rb.isChecked(), Toast.LENGTH_SHORT).show();
                    Toast.makeText(getApplicationContext(), "D " + checkedId, Toast.LENGTH_SHORT).show();*/


                    if (mode == 1 && view.getVisibility() == View.INVISIBLE)
                        view.setVisibility(View.VISIBLE);


                }

                if (null != rb && checkedId > -1 && STATUS()) {

                    if (rb.isChecked()) {
                        if (rb.getText().toString().equals("A")) {
                            ans = "A";

                            if (mode == 1) {
                                id.set(count - 1, checkedId);
                                Showprogress();
                            }
                            if (mode == 2) {
                                LIST.get(count - 1).add(checkedId);
                               // System.out.println(checkedId);
                             //   System.out.println("list b " + LIST.get(count - 1).size());
                             //   System.out.println("List size b " + LIST.size());
                             //   System.out.println("L b " + LIST.get(count - 1));

                            }
                        } else if (rb.getText().toString().equals("B")) {
                            ans = "B";

                            if (mode == 1) {
                                id.set(count - 1, checkedId);
                                Showprogress();

                            }
                            if (mode == 2) {
                                LIST.get(count - 1).add(checkedId);
                                /*System.out.println(checkedId);
                                System.out.println("list b " + LIST.get(count - 1).size());
                                System.out.println("List size b " + LIST.size());
                                System.out.println("L b " + LIST.get(count - 1));*/
                            }
                        } else if (rb.getText().toString().equals("C")) {
                            ans = "C";

                            if (mode == 1) {
                                id.set(count - 1, checkedId);
                                Showprogress();

                            }
                            if (mode == 2) {
                                LIST.get(count - 1).add(checkedId);
                                /*System.out.println(checkedId);
                                System.out.println("list b " + LIST.get(count - 1).size());
                                System.out.println("List size b" + LIST.size());
                                System.out.println("L b " + LIST.get(count - 1));*/
                            }
                        } else if (rb.getText().toString().equals("D")) {
                            ans = "D";

                            if (mode == 1) {
                                id.set(count - 1, checkedId);
                                Showprogress();
                            }
                            if (mode == 2) {
                                LIST.get(count - 1).add(checkedId);
                                /*System.out.println(checkedId);
                                System.out.println("list b " + LIST.get(count - 1).size());
                                System.out.println("List size b " + LIST.size());
                                System.out.println("L b  " + LIST.get(count - 1));*/
                            }
                        }
                    }
                }

                if (STATUS() && !b_click)
                    AnswerInputDialog();

                else
                    Hideprogress();

            }
        });

        /** Calls to display next or previous question **/
        getNextQuestion();
        getPreviousQuestion();

        /** Swipe Gesture detectors from on the views**/
        parentLayoutswipeGesture();
        B_imagebackgroundGesture();

    }





    /**
     *
     */
    private void ViewAnswer() {

        view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                v_iew = true;
                Showprogress();
                if (mode == 0) {

                    if (frag == 0) {

                        if (type == 0) {

                            storageRef.child("Waec-Jamb").child("Readthroughmode").child("Algebra").child("Answers").child("A" + rand.get(count - 1) + ".jpg")
                                    .getBytes(Long.MAX_VALUE).addOnSuccessListener(new OnSuccessListener<byte[]>() {
                                @Override
                                public void onSuccess(byte[] bytes) {

                                    Intent intent = new Intent(Questions.this, Answer.class);
                                    intent.putExtra("DATA", bytes);
                                    intent.putExtra("TYPE", type);
                                    intent.putExtra("FRAG", frag);
                                    intent.putExtra("MODE", mode);
                                    startActivity(intent);
                                    // Use the bytes to display the image
                                }
                            }).addOnFailureListener(new OnFailureListener() {
                                @Override
                                public void onFailure(@NonNull Exception exception) {

                                    Toast.makeText(Questions.this, exception.getMessage(), Toast.LENGTH_LONG).show();
                                    // Handle any errors
                                }
                            });

                        }
                    }

                }

                if (mode == 1) {

                    if (frag == 0) {

                        if (type == 0) {

                            storageRef.child("Waec-Jamb").child("Solvequestionsmode").child("Algebra").child("Answers").child("A" + rand.get(count - 1) + ".jpg")
                                    .getBytes(Long.MAX_VALUE).addOnSuccessListener(new OnSuccessListener<byte[]>() {
                                @Override
                                public void onSuccess(byte[] bytes) {

                                    Intent intent = new Intent(Questions.this, Answer.class);
                                    intent.putExtra("DATA", bytes);
                                    intent.putExtra("TYPE", type);
                                    intent.putExtra("FRAG", frag);
                                    intent.putExtra("MODE", mode);
                                    startActivity(intent);
                                    // Use the bytes to display the image
                                }
                            }).addOnFailureListener(new OnFailureListener() {
                                @Override
                                public void onFailure(@NonNull Exception exception) {

                                    Toast.makeText(Questions.this, exception.getMessage(), Toast.LENGTH_LONG).show();

                                }
                            });
                        }
                    }
                }

                if (mode == 2) {

                    if (view.getText().equals("FINISH EXAM")){
                        Finish = true;
                        for (int i = 0; i < status.size(); i++) {
                            if (!status.get(i)) {
                                complete = false;
                                num = i + 1;
                                names.add("Question " + (num));
                            }

                        }

                        if (!complete && names.size() > 0)
                            setSummaryDialog();

                        else if (complete || names.size() == 0) {
                            Intent intent = new Intent(Questions.this, Summary.class);
                            setAttempt();
                            intent.putExtra("SCORE", Score);
                            intent.putExtra("attempt",attempt);
                            done = true;
                            intent.putExtra("AT",arr);
                            startActivity(intent);
                        }

                    } else {

                        storageRef.child("Waec-Jamb").child("Takemockexammode").child("WAEC").child("Answers").child("A" + rand.get(count - 1) + ".JPG")
                                .getBytes(Long.MAX_VALUE).addOnSuccessListener(new OnSuccessListener<byte[]>() {
                            @Override
                            public void onSuccess(byte[] bytes) {

                                Intent intent = new Intent(Questions.this, Answer.class);
                                intent.putExtra("DATA", bytes);
                                intent.putExtra("TYPE", type);
                                intent.putExtra("FRAG", frag);
                                intent.putExtra("MODE", mode);
                                startActivity(intent);
                                // Use the bytes to display the image
                            }
                        }).addOnFailureListener(new OnFailureListener() {
                            @Override
                            public void onFailure(@NonNull Exception exception) {

                                Toast.makeText(Questions.this, exception.getMessage(), Toast.LENGTH_LONG).show();

                            }
                        });
                    }


                }
            }
        });
    }

    /**
     * Display the current downloaded file on the screen
     *
     * @param bytes: array of type "bytes" that contains the file downloaded
     */
    private void getFile(byte[] bytes) {

        String j = "FINISH EXAM";

        /**Displays the question number of each question **/

        Bitmap bitmap = BitmapFactory.decodeByteArray(bytes, 0, bytes.length);
        B_Image.setImageBitmap(bitmap);

        quest_num();


        if (mode == 1) {
            if (!STATUS())
                view.setVisibility(View.INVISIBLE);
            if (STATUS())
                view.setVisibility(View.VISIBLE);
        } else if (mode == 2) {
            if (count == 1)
                visited.set(count - 1, true);
            if (!Summary.seen) {
                view.setText(j);
                view.setVisibility(View.VISIBLE);
            }

        }

    }

    public void setAttempt(){

        for(int i =0; i<status.size();i++){
            if(status.get(i))
                attempt++;
        }
    }

    /**
     *
     */
    @TargetApi(Build.VERSION_CODES.M)
    private void AnswerInputDialog() {
        if (mode == 1) { //Solve question mode
            if (frag == 0) { // Waec/jamb questions
                if (type == 0) { // Algebra
                    if (ans.length() == 0) {
                        Toast.makeText(getApplicationContext(), "No Answer Entered", Toast.LENGTH_LONG).show();
                    } else {
                        Rand_ans = rand.get(count - 1);
                        databaseReference.child("Waec_Jamb").child("Algebra_p").child("Q" + Rand_ans).addListenerForSingleValueEvent(new ValueEventListener() {
                            @Override
                            public void onDataChange(DataSnapshot dataSnapshot) {

                                if (ans.equalsIgnoreCase((String)dataSnapshot.getValue())) {

                                    A_value.set(count - 1, true);
                                    Score++;
                                    showRigthresponseDialog();


                                } else {
                                    showWrongresponseDialog();
                                }

                            }

                            @Override
                            public void onCancelled(DatabaseError databaseError) {

                                Toast.makeText(getApplicationContext(), databaseError.getMessage(), Toast.LENGTH_LONG).show();
                                Hideprogress();
                            }
                        });
                    }

                    //Hideprogress();
                } else if (type == 1) {
                    //TODO
                } else if (type == 2) {
                    //TODO
                } else if (type == 3) {
                    //TODO
                } else if (type == 4) {
                    //TODO
                }
            } else if (frag == 1) {
                //TODO
            } else if (frag == 2) {

                //TODO
            }
        } else if (mode == 2) { //Real_question mode
                    if (ans.length() == 0) {
                        Toast.makeText(getApplicationContext(), "No Answer Entered", Toast.LENGTH_LONG).show();
                    } else {
                        Rand_ans = rand.get(count - 1);
                        databaseReference.child("Waec_Jamb").child("Exam").child("Q" + Rand_ans).addListenerForSingleValueEvent(new ValueEventListener() {
                            @Override
                            public void onDataChange(DataSnapshot dataSnapshot) {

                                if (ans.equalsIgnoreCase((String)dataSnapshot.getValue())){

                                    A_value.set(count - 1, true);
                                    Score++;
                                    map.put(Rand_ans,true);
                                    arr.add(map.toString());
                                }

                                else {
                                    map.put(Rand_ans, false);
                                    arr.add(map.toString());
                                }

                            }

                            @Override
                            public void onCancelled(DatabaseError databaseError) {

                                Toast.makeText(getApplicationContext(), databaseError.getMessage(), Toast.LENGTH_LONG).show();
                                Hideprogress();
                            }
                        });
                    }




        } else {// Readthroughmode

            if (frag == 0) {

            } else if (frag == 1) {

            } else if (frag == 2) {


            }
            //TODO
        }
    }

    /**
     *
     */
    private void showRigthresponseDialog() {

        AlertDialog.Builder right = new AlertDialog.Builder(Questions.this);
        LayoutInflater inflater = getLayoutInflater();
        final View view = inflater.inflate(R.layout.time_dialog, null);

        right.setView(view);

        right.setTitle("Matimatiks");
        right.setMessage("Correct!");

        mediaPlayer = MediaPlayer.create(Questions.this, R.raw.correctanswer);
        mediaPlayer.start();
        right.setOnCancelListener(new DialogInterface.OnCancelListener() {
            @Override
            public void onCancel(DialogInterface dialogInterface) {

                if (STATUS()) {
                    disableButton();
                    options.setBackgroundColor(Color.GREEN);


                } else {

                    options.setBackgroundColor(Color.WHITE);
                    rb.setChecked(false);


                }


            }
        });

        AlertDialog r = right.create();
        r.show();
        if (r.isShowing())
            Hideprogress();

    }


    /**
     *
     */
    private void showWrongresponseDialog() {

        AlertDialog.Builder wrong = new AlertDialog.Builder(Questions.this);
        LayoutInflater inflater = getLayoutInflater();
        final View view = inflater.inflate(R.layout.time_dialog, null);

        wrong.setView(view);

        wrong.setTitle("Matimatiks");
        wrong.setMessage("Wrong!");

        mediaPlayer = MediaPlayer.create(Questions.this, R.raw.failbuzzer01);
        mediaPlayer.start();

        wrong.setOnCancelListener(new DialogInterface.OnCancelListener() {
            @Override
            public void onCancel(DialogInterface dialogInterface) {

                if (STATUS()) {
                    disableButton();
                    options.setBackgroundColor(Color.RED); //RED
                    System.out.println("H1 ");
                } else {

                    options.setBackgroundColor(Color.WHITE);

                }


            }
        });

        AlertDialog w = wrong.create();
        w.show();
        if (w.isShowing())
            Hideprogress();

    }


    /**
     *
     *
     */
    private void getNextQuestion() {

        next.setOnClickListener(new View.OnClickListener() {
            @TargetApi(Build.VERSION_CODES.M)
            @Override
            public void onClick(View view) {
                count++;
                if (count > NOF) {//End of question
                    count = NOF;

                    Toast.makeText(getApplicationContext(), "This is the Last question", Toast.LENGTH_LONG).show();

                }


                if (!STATUS()) {
                    B_Image.setClickable(true);
                    enableButton();
                    if (options != null) {
                        options.clearCheck();
                    }


                } else if (STATUS()) {
                    b_click = true;
                    if (mode == 1) {
                        if (A_value.get(count - 1)  )
                            options.setBackgroundColor(Color.GREEN);

                        else if (!A_value.get(count - 1)) {
                            options.setBackgroundColor(Color.RED);
                            System.out.println("H2 ");
                        }
                    }
                    if (mode == 2) {
                        if (Summary.seen) {
                            disableButton();
                            if (A_value.get(count - 1))
                                options.setBackgroundColor(Color.GREEN);

                            else if (!A_value.get(count - 1)) {
                                options.setBackgroundColor(Color.RED);
                                System.out.println("H3 ");
                            }

                        } //else if (!Summary.seen)
                           // answeredDialog();
                    }

                }

                DisplayNextQuestion();
                Showprogress();
                pause();


            }
        });


    }

    /**
     *
     *
     */
    private void getPreviousQuestion() {

        previous.setOnClickListener(new View.OnClickListener() {
            @TargetApi(Build.VERSION_CODES.M)
            @Override
            public void onClick(View view) {

                count--;

                if (count < 1) {
                    count = 1;

                    Toast.makeText(getApplicationContext(), "This is the first question", Toast.LENGTH_LONG).show();
                }


                if (!STATUS()) {
                    B_Image.setClickable(true);
                    enableButton();
                    if (options != null)
                        options.clearCheck();

                } else if (STATUS()) {
                    b_click = true;

                    if (mode == 1) {
                        if (A_value.get(count - 1)   )
                            options.setBackgroundColor(Color.GREEN);

                        else if (!A_value.get(count - 1) )
                            options.setBackgroundColor(Color.RED);
                    }

                    if (mode == 2) {

                        if (Summary.seen) {
                            disableButton();
                            if (A_value.get(count - 1))
                                options.setBackgroundColor(Color.GREEN);

                            else if (!A_value.get(count - 1))
                                options.setBackgroundColor(Color.RED);

                        } //else if (!Summary.seen)
                            //answeredDialog();
                    }
                }

                DisplayPreviousQuestion();
                Showprogress();
                pause();


            }

        });


    }

    /**
     * Display the next question activity on call to getNextQuestion
     */
    private void DisplayNextQuestion() {

        if (mode == 0) {

            if (frag == 0) {

                if (type == 0) {

                    /**ListIterator for the above arraylist; iterates through the arraylist **/
                    Ilist = Qlist.listIterator();

                    while (Ilist.hasNext())
                        tmp.add(Ilist.next());


                    Randoms = tmp.get(count - 1);


                    storageRef.child("Waec-Jamb/Readthroughmode/Algebra/Questions/Q" + Randoms + ".jpg").getBytes(Long.MAX_VALUE).addOnSuccessListener(new OnSuccessListener<byte[]>() {
                        @Override
                        public void onSuccess(byte[] bytes) {
                            getFile(bytes);
                            Hideprogress();


                        }
                    }).addOnFailureListener(new OnFailureListener() {
                        @Override
                        public void onFailure(@NonNull Exception e) {

                            Toast.makeText(getApplicationContext(), e.getMessage(), Toast.LENGTH_SHORT).show();

                        }
                    });
                }


            }
        }

        if (mode == 1) {//Solve question mode
            if (frag ==  0) { // Waec/jamb questions
                if (type == 0) {//Algebra

                    /**ListIterator for the above arraylist; iterates through the arraylist **/
                    Ilist = Qlist.listIterator();

                    while (Ilist.hasNext())
                        tmp.add(Ilist.next());


                    Randoms = tmp.get(count - 1);


                    storageRef.child("Waec-Jamb").child("Solvequestionsmode").child("Algebra").child("Questions").child("Q" + Randoms + ".jpg").getBytes(Long.MAX_VALUE).addOnSuccessListener(new OnSuccessListener<byte[]>() {
                        @Override
                        public void onSuccess(byte[] bytes) {

                            getFile(bytes);
                            Hideprogress();


                        }
                    }).addOnFailureListener(new OnFailureListener() {
                        @Override
                        public void onFailure(@NonNull Exception e) {

                            Toast.makeText(getApplicationContext(), e.getMessage(), Toast.LENGTH_SHORT).show();


                        }
                    });


                }
            }
        }


        if (mode == 2) {//Takemockexam mode
                    /**ListIterator for the above arraylist; iterates through the arraylist **/
                    Ilist = Qlist.listIterator();

                    while (Ilist.hasNext())
                        tmp.add(Ilist.next());

                    Randoms = tmp.get(count - 1);

                    storageRef.child("Waec-Jamb/Takemockexammode/WAEC/Questions/Q" + Randoms + ".JPG").getBytes(Long.MAX_VALUE).addOnSuccessListener(new OnSuccessListener<byte[]>() {
                        @Override
                        public void onSuccess(byte[] bytes) {

                            getFile(bytes);
                            Hideprogress();
                            if (!Summary.seen)
                                resume();

                            visited.set(count - 1, true);
                            reviewed = false;
                        }
                    }).addOnFailureListener(new OnFailureListener() {
                        @Override
                        public void onFailure(@NonNull Exception e) {

                            Toast.makeText(getApplicationContext(), e.getMessage(), Toast.LENGTH_SHORT).show();
                            reviewed = false;

                        }
                    });




        }
    }


    /**
     *
     */
    private void DisplayPreviousQuestion() {
        if (mode == 0) { //Solve question mode
            if (frag == 0) { // Waec/jamb questions
                if (type == 0) {
                    if (tmp.size() > 0 && count >= 1) {
                        Randoms = tmp.get(count - 1);
                        System.out.println("Prev " + Randoms);
                        storageRef.child("Waec-Jamb/Readthroughmode/Algebra/Questions/Q" + Randoms + ".jpg").getBytes(Long.MAX_VALUE).addOnSuccessListener(new OnSuccessListener<byte[]>() {
                            @Override
                            public void onSuccess(byte[] bytes) {

                                getFile(bytes);
                                Hideprogress();


                            }
                        }).addOnFailureListener(new OnFailureListener() {
                            @Override
                            public void onFailure(@NonNull Exception e) {

                                Toast.makeText(getApplicationContext(), e.getMessage(), Toast.LENGTH_SHORT).show();

                            }
                        });
                    } else {

                        Toast.makeText(getApplicationContext(), "This is the first question", Toast.LENGTH_LONG).show();
                    }
                }
            }
        }
        if (mode == 1) { //Solve question mode
            if (frag == 0) { // Waec/jamb questions
                if (type == 0) {
                    if (tmp.size() > 0 && count >= 1) {
                        Randoms = tmp.get(count - 1);
                        System.out.println("Prev " + Randoms);
                        storageRef.child("Waec-Jamb/Solvequestionsmode/Algebra/Questions/Q" + Randoms + ".jpg").getBytes(Long.MAX_VALUE).addOnSuccessListener(new OnSuccessListener<byte[]>() {
                            @Override
                            public void onSuccess(byte[] bytes) {

                                getFile(bytes);
                                Hideprogress();


                            }
                        }).addOnFailureListener(new OnFailureListener() {
                            @Override
                            public void onFailure(@NonNull Exception e) {

                                Toast.makeText(getApplicationContext(), e.getMessage(), Toast.LENGTH_SHORT).show();

                            }
                        });

                    } else {

                        Toast.makeText(getApplicationContext(), "This is the first question", Toast.LENGTH_LONG).show();
                    }
                }
            }
        }

        if (mode == 2) { //Take mock exam mode
                    if (tmp.size() == 0)
                        Toast.makeText(getApplicationContext(), "This is the first question", Toast.LENGTH_LONG).show();
                    else {
                        Randoms = tmp.get(count - 1);
                        storageRef.child("Waec-Jamb/Takemockexammode/WAEC/Questions/Q" + Randoms + ".JPG").getBytes(Long.MAX_VALUE).addOnSuccessListener(new OnSuccessListener<byte[]>() {
                            @Override
                            public void onSuccess(byte[] bytes) {

                                getFile(bytes);
                                Hideprogress();
                                if (!Summary.seen)
                                    resume();

                            }
                        }).addOnFailureListener(new OnFailureListener() {
                            @Override
                            public void onFailure(@NonNull Exception e) {

                                Toast.makeText(getApplicationContext(), e.getMessage(), Toast.LENGTH_SHORT).show();

                            }
                        });

                    }


        }


    }


    @Override
    protected void onStop() {
        super.onStop();

    }

    @Override
    protected void onPause() {
        super.onPause();
        System.out.println("FINISH "+Finish);
        System.out.println("back "+back);
        System.out.println("mode "+mode);
       if(!Finish && !back && mode == 2 && count != 1){
           id.clear();
           Stop();
           final AlertDialog.Builder p = new AlertDialog.Builder(this);
           p.setTitle("Matimatiks");
           p.setMessage("Them exam was exited while in session. You would have to restart to continue. Click yes to continue");
           p.setPositiveButton("Yes", new DialogInterface.OnClickListener() {
               public void onClick(DialogInterface dialog, int id) {
                   clear = true;
                   count = 1;
                   tapcount = 0;
                   Summary.seen = false;
                   Score = 0;
                   Finish = false;
                   back = false;
                   Stop();
                   isPaused = false;
                   isCanceled = false;
                   start = false;
                   Questions.this.finish();
                   startActivity(getIntent());

               }
           });
           p.setOnCancelListener(new DialogInterface.OnCancelListener() {
               @Override
               public void onCancel(DialogInterface dialogInterface) {
                   Questions.this.finish();
                   startActivity(getIntent());
               }
           });
           p.show();
       }
    }


    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

    @Override
    protected void onResume() {
        super.onResume();
        back = false;
        Summary.displayed = false;

        if (Summary.seen) {
            String text = "View Answer";
            attempt = 0;
            view.setText(text);
            disableButton();
            Stop();
            if (A_value.get(count - 1))
                options.setBackgroundColor(Color.GREEN);

            else if (!A_value.get(count - 1) ) {
                options.setBackgroundColor(Color.RED);
                System.out.println("H4 ");
            }

            if (STATUS())
                options.check(LIST.get(count - 1).get(LIST.get(count - 1).size() - 1));

            ViewAnswer();

        }



    }

    /**
     * Take care of popping the fragment back queue or finishing the activity
     * as appropriate.
     */
    @Override
    public void onBackPressed() {
        back = true;
        id.clear();
        final AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Matimatiks");
        builder.setMessage("Do you want to exit this session");
        builder.setPositiveButton("Yes", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                clear = true;
                count = 1;
                tapcount = 0;
                Summary.seen = false;
                Score = 0;
                Finish = false;
                back = true;
                Stop();
                isPaused = false;
                isCanceled = false;
                Summary.saved = false;
                start = false;
                Questions.this.finish();


            }
        });
        builder.setNegativeButton("No", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {

                dialog.cancel();
            }
        });
        builder.show();
    }


    /**
     *
     */
    private void answeredDialog() {

        AlertDialog.Builder answer_status = new AlertDialog.Builder(Questions.this);
        answer_status.setTitle("Matimatiks");
        answer_status.setMessage("Status: This question has been answered");

        if (mode == 1) {

            if (frag == 0) {

                if (type == 0) {

                    answer_status.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialogInterface, int i) {

                        }
                    }).setOnCancelListener(new DialogInterface.OnCancelListener() {
                        @TargetApi(Build.VERSION_CODES.M)
                        @Override
                        public void onCancel(DialogInterface dialogInterface) {

                            if (STATUS() && A_value.get(count - 1)) {
                                options.setBackgroundColor(Color.GREEN);
                                disableButton();

                            }
                            if (STATUS() && !A_value.get(count - 1)) {
                                options.setBackgroundColor(Color.RED);
                                disableButton();

                            }
                        }
                    });


                    AlertDialog a = answer_status.create();
                    a.show();


                }
            }
        }


        if (mode == 2) {

                    answer_status.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialogInterface, int i) {

                        }
                    }).setOnCancelListener(new DialogInterface.OnCancelListener() {
                        @TargetApi(Build.VERSION_CODES.M)
                        @Override
                        public void onCancel(DialogInterface dialogInterface) {

                            if (STATUS()) {
                                disableButton();

                            }

                        }
                    });


                    AlertDialog a = answer_status.create();
                    a.show();
        }


    }

    /**
     * @return
     */
    private boolean STATUS() {
        return (status.get(count - 1));

    }

    /**
     *
     */
    private void SetTimer() {

        final AlertDialog.Builder ab = new AlertDialog.Builder(Questions.this);
        final AlertDialog.Builder s_time = new AlertDialog.Builder(Questions.this);
        AlertDialog in;

        final String PREFS_NAME = "MyPrefsFile";


        final AlertDialog intro;


        // Get current version code
        int currentVersionCode = 0;
        try {
            currentVersionCode = getPackageManager().getPackageInfo(getPackageName(), 0).versionCode;
        } catch (android.content.pm.PackageManager.NameNotFoundException e) {
            // handle exception
            e.printStackTrace();
            return;
        }


        LayoutInflater inflater = getLayoutInflater();
        final View view = inflater.inflate(R.layout.time_dialog, null);

        LayoutInflater inflat = getLayoutInflater();
        final View S_view = inflat.inflate(R.layout.edit_dialog, null);

        ab.setView(S_view);
        s_time.setView(view);

        TextView text = (TextView) view.findViewById(R.id.mode);

        String time = "Press start to begin";

        text.setText(time);

        s_time.setPositiveButton("Start", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {


                if (view.getVisibility() == View.VISIBLE)
                    view.setVisibility(View.INVISIBLE);

                start();

            }
        }).setOnCancelListener(new DialogInterface.OnCancelListener() {
            @Override
            public void onCancel(DialogInterface dialog) {
                // Do nothing
            }
        }).setCancelable(false);

        TextView textView = S_view.findViewById(R.id.t_mode);

        String j = String.valueOf(NOF);
        String k = "In this mode you would be required to complete the questions under ";
        String b = " minutes. Click submit only when you are done with the exam, after which the questions would be closed. This is a model of a " +
                "live exam scenario. Press continue to start.";
        String f_string = k.concat(j).concat(b);

        final CheckBox checkBox = S_view.findViewById(R.id.check_mode);

        textView.setText(f_string);

        ab.setPositiveButton("Continue", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {

                String checkBoxResult = "NOT checked";
                if (checkBox.isChecked())
                    checkBoxResult = "checked";
                SharedPreferences settings = getSharedPreferences(PREFS_NAME, 0);
                SharedPreferences.Editor editor = settings.edit();
                editor.putString("skipMessage", checkBoxResult);
                // Commit the edits!
                editor.apply();

                AlertDialog in = s_time.create();
                in.show();


            }
        }).setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                String checkBoxResult = "NOT checked";
                if (checkBox.isChecked())
                    checkBoxResult = "checked";
                SharedPreferences settings = getSharedPreferences(PREFS_NAME, 0);
                SharedPreferences.Editor editor = settings.edit();
                editor.putString("skipMessage", checkBoxResult);
                // Commit the edits!
                editor.apply();

                Questions.this.finish();

            }
        }).setOnCancelListener(new DialogInterface.OnCancelListener() {
            @Override
            public void onCancel(DialogInterface dialog) {

                String checkBoxResult = "NOT checked";
                if (checkBox.isChecked())
                    checkBoxResult = "checked";
                SharedPreferences settings = getSharedPreferences(PREFS_NAME, 0);
                SharedPreferences.Editor editor = settings.edit();
                editor.putString("skipMessage", checkBoxResult);
                // Commit the edits!
                editor.apply();

                //Questions.this.finish();
                AlertDialog in = s_time.create();
                in.show();

            }
        });

        intro = ab.create();


        SharedPreferences settings = getSharedPreferences(PREFS_NAME, 0);
        String skipMessage = settings.getString("skipMessage", "NOT checked");
        if (!skipMessage.equals("checked"))
            intro.show();

        if (!intro.isShowing())
            s_time.create().show();


    }

    //Set a Click Listener for resume button
    public void resume() {
       time =  findViewById(R.id.time);
        //Specify the current state is not paused and canceled.
        isPaused = false;
        isCanceled = false;

        //Initialize a new CountDownTimer instance
        long millisInFuture = timeRemaining;
        long countDownInterval = 1000;
        new CountDownTimer(millisInFuture, countDownInterval) {
            public void onTick(long millisUntilFinished) {

                int seconds = (int) (timeRemaining / 1000) % 60;
                int minutes = (int) ((timeRemaining / (1000 * 60)) % 60);
                int hours = (int) ((timeRemaining / (1000 * 60 * 60)) % 24);

                String j = hours + " : " + minutes + " : " + seconds;
                time.setText(j);

                //Do something in every tick
                if (isPaused || isCanceled) {
                    //If user requested to pause or cancel the count down timer
                    cancel();
                } else {
                    //Put count down timer remaining time in a variable
                    timeRemaining = millisUntilFinished;
                    int sec = (int) (timeRemaining / 1000) % 60;
                    int min = (int) ((timeRemaining / (1000 * 60)) % 60);
                    int hrs = (int) ((timeRemaining / (1000 * 60 * 60)) % 24);

                    String k = hrs + " : " + min + " : " + sec;
                    time.setText(k);
                }
            }

            public void onFinish() {

                Timeprogress();
                Finish = true;
            }
        }.start();



    }

    public void start(){
        time =  findViewById(R.id.time);
        isPaused = false;
        isCanceled = false;

        final CountDownTimer timer;
        long millisInFuture = 3000000; //50 minutes
        long countDownInterval = 1000; //1 second


        //Initialize a new CountDownTimer instance
        new CountDownTimer(millisInFuture, countDownInterval) {
            public void onTick(long millisUntilFinished) {

                int seconds = (int) (millisUntilFinished / 1000) % 60;
                int minutes = (int) ((millisUntilFinished / (1000 * 60)) % 60);
                int hours = (int) ((millisUntilFinished / (1000 * 60 * 60)) % 24);

                String j = hours + " : " + minutes + " : " + seconds;
                time.setText(j);

                //do something in every tick
                if (isPaused || isCanceled) {
                    //If the user request to cancel or paused the
                    //CountDownTimer we will cancel the current instance
                    cancel();
                } else {
                    //Display the remaining seconds to app interface
                    //1 second = 1000 milliseconds
                    //Put count down timer remaining time in a variable
                    timeRemaining = millisUntilFinished;
                    int sec = (int) (timeRemaining / 1000) % 60;
                    int min = (int) ((timeRemaining / (1000 * 60)) % 60);
                    int hrs = (int) ((timeRemaining / (1000 * 60 * 60)) % 24);

                    String k = hrs + " : " + min + " : " + sec;
                    time.setText(k);

                }
            }

            public void onFinish() {
                //Do something when count down finished
                Timeprogress();
                Finish =  true;
            }
        }.start();

    }

    public void Stop(){
        isCanceled =true;
    }

    public void pause(){
        isPaused = true;
    }


    public void Timeprogress() {
        final ProgressDialog prog;
        prog = new ProgressDialog(Questions.this);
        prog.setMessage("Computing Result...");
        prog.setTitle("OOPS! Time is up");
        prog.setProgressStyle(ProgressDialog.STYLE_SPINNER);
        prog.setIndeterminate(true);
        prog.setProgress(0);
        final Intent finalIntent = new Intent(Questions.this, Summary.class);
        final String finish = "Entire time";
        new CountDownTimer(3000, 1000) {

            @TargetApi(Build.VERSION_CODES.JELLY_BEAN_MR1)
            public void onTick(long millisUntilFinished) {
                //start = false;
                if (!Questions.this.isDestroyed())
                    prog.show();


            }

            public void onFinish() {
                prog.dismiss();
                finalIntent.putExtra("SCORE", Score);
                finalIntent.putExtra("AVAL", A_value.toArray());
                finalIntent.putExtra("attempt",attempt);
                finalIntent.putExtra("TIME", finish);
                finalIntent.putExtra("AT",arr);
                startActivity(finalIntent);
            }
        }.start();
    }

    /**
     * @param b
     */

    protected void tempArrayList(ArrayList<Boolean> b) {

        for (int i = 0; i < NOF; i++) {

            b.add(Boolean.FALSE);

        }
    }

    protected void tempArrayint(ArrayList<Integer> b) {

        for (int i = 0; i < NOF; i++) {

            b.add(0);

        }
    }

    /**
     * method to Set up a progress bar and displaying it
     */
    @TargetApi(Build.VERSION_CODES.JELLY_BEAN_MR1)
    public void Showprogress() {

        if (v_iew) {

            progress = new ProgressDialog(Questions.this);
            progress.setMessage("Loading...");
            progress.setProgressStyle(ProgressDialog.STYLE_SPINNER);
            progress.setIndeterminate(true);
            progress.setProgress(0);

            new CountDownTimer(2000, 1000) {

                public void onTick(long millisUntilFinished) {
                    progress.show();
                }

                public void onFinish() {
                    progress.dismiss();
                }
            }.start();
        }
        if (done) {

            progress = new ProgressDialog(Questions.this);
            progress.setMessage("Loading...");
            progress.setProgressStyle(ProgressDialog.STYLE_SPINNER);
            progress.setIndeterminate(true);
            progress.setProgress(0);

            new CountDownTimer(2000, 1000) {

                public void onTick(long millisUntilFinished) {
                    progress.show();
                }

                public void onFinish() {
                    progress.dismiss();
                }
            }.start();
        } else {
            progress = new ProgressDialog(Questions.this);
            progress.setMessage("Loading...");
            progress.setProgressStyle(ProgressDialog.STYLE_SPINNER);
            progress.setIndeterminate(true);
            progress.setProgress(0);
            progress.show();
        }
    }

    /**
     * Method to Hide the displayed progressbar
     */
    public void Hideprogress() {


        if (progress != null) {

            if (progress.isShowing()) {
                progress.dismiss();

                if (!STATUS()) {

                    options.setBackgroundColor(Color.WHITE);

                    if (Summary.seen) {
                        disableButton();
                        options.setBackgroundColor(Color.RED);
                    }


                    if (mode == 2) {

                        if (!visited.get(count - 1)) {
                            list = new ArrayList<>();
                            LIST.add(list);
                        }
                        /*System.out.println("list " + LIST.get(count - 1).size());
                        System.out.println("List size" + LIST.size());
                        System.out.println("L " + LIST.get(count - 1));*/
                    }

                } else if (STATUS()) {

                    if (mode == 1) {
                        if (options != null && id.get(count - 1) != 0) {

                            options.check(id.get(count - 1));

                        }

                    } else if (mode == 2) {

                        if (options != null) {

                           /*System.out.println("list o" + LIST.get(count - 1).size());
                                                  System.out.println("List size o " + LIST.size());
                                            System.out.println("L o " + LIST.get(count - 1));*/


                            options.check(LIST.get(count - 1).get(LIST.get(count - 1).size() - 1));


                        }

                    }
                }

            }
        }
    }


    @Override
    public void randomNum(int Nof) {

        for (int i = 0; i < Nof; i++)

            Qlist.add(rand.get(i));


    }

    /**
     *
     */
    public void setSummaryDialog() {
        final AlertDialog.Builder alertDialog = new AlertDialog.Builder(Questions.this);
        LayoutInflater inflater = getLayoutInflater();
        final View convertView = inflater.inflate(R.layout.summary_dialog, null);
        alertDialog.setView(convertView);
        String t = "The following question(s) have not been attempted. Submit anyway? Click on a question to return to the exam.";
        alertDialog.setPositiveButton("Yes", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {

                Stop();
                done = true;
                disableButton();
                Intent intent = new Intent(Questions.this, Summary.class);
                intent.putExtra("SCORE", Score);
                setAttempt();
                intent.putExtra("attempt",attempt);
                intent.putExtra("TIME", timeRemaining);
                intent.putExtra("AT",arr);
                startActivity(intent);

            }
        }).setCancelable(false);
        TextView textView =  convertView.findViewById(R.id.s_mode);
        textView.setText(t);
        ListView lv =  convertView.findViewById(R.id.lv);
        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, names);
        lv.setAdapter(adapter);
        final AlertDialog al = alertDialog.create();
        al.show();
        pause();


        lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {

                String j;
                String[] parts;
                int val;
                Showprogress();
                al.dismiss();
                j = names.get(position);
                parts = j.split(" ");

                String part2 = parts[1];

                val = Integer.parseInt(part2);

                count = val;
                pause();
                DisplayNextQuestion();

                if (!STATUS()) {
                    if (options != null) {
                        options.clearCheck();
                    }
                }
                names.clear();
            }
        });

    }

    /**
     *
     */
    private void quest_num() {
        String j;
        TextView im = findViewById(R.id.nos);
        String k = "Question #";

        j = String.valueOf(count);
        im.setText(k.concat(j));
    }


    /**
     *
     */
    @SuppressLint("ClickableViewAccessibility")
    public void parentLayoutswipeGesture() {

        relativeLayout.setOnTouchListener(new OnSwipeTouchListener(this) {

            @Override
            public void onSwipeDown() {
            }

            @Override
            public void onSwipeLeft() {


                count++;
                tapcount = 0;

                if (count > NOF) {//End of question
                    count = NOF;

                    Toast.makeText(getApplicationContext(), "This is the Last question", Toast.LENGTH_LONG).show();

                }

                if (!STATUS()) {
                    B_Image.setClickable(true);
                    enableButton();
                    if (options != null) {
                        options.clearCheck();
                    }

                } else if (STATUS()) {

                    b_click = true;
                    if (mode == 1) {
                        if (A_value.get(count - 1))
                            options.setBackgroundColor(Color.GREEN);

                        else if (!A_value.get(count - 1))
                            options.setBackgroundColor(Color.RED);

                    }
                    if (mode == 2) {
                        if (Summary.seen) {
                            disableButton();
                            if (A_value.get(count - 1) )
                                options.setBackgroundColor(Color.GREEN);

                            else if (!A_value.get(count - 1))
                                options.setBackgroundColor(Color.RED);

                        }
                    }

                }


                DisplayNextQuestion();
                Showprogress();
                pause();

            }


            @Override
            public void onSwipeUp() {

            }

            @Override
            public void onSwipeRight() {


                count--;


                if (count < 1) {
                    count = 1;

                    Toast.makeText(getApplicationContext(), "This is the first question", Toast.LENGTH_LONG).show();
                }


                if (!STATUS()) {
                    B_Image.setClickable(true);
                    enableButton();
                    if (options != null)
                        options.clearCheck();

                } else if (STATUS()) {
                    b_click = true;

                    if (mode == 1) {
                        if (A_value.get(count - 1))
                            options.setBackgroundColor(Color.GREEN);

                        else if (!A_value.get(count - 1))
                            options.setBackgroundColor(Color.RED);
                    }

                    if (mode == 2) {

                        if (Summary.seen) {
                            disableButton();
                            if (A_value.get(count - 1))
                                options.setBackgroundColor(Color.GREEN);

                            else if (!A_value.get(count - 1))
                                options.setBackgroundColor(Color.RED);

                        }
                    }
                }

                DisplayPreviousQuestion();
                Showprogress();
                pause();


            }
        });

    }

    /**
     *
     */
    @SuppressLint("ClickableViewAccessibility")
    public void B_imagebackgroundGesture() {

        B_Image.setOnTouchListener(new OnSwipeTouchListener(this) {

            @Override
            public void onSwipeDown() {
            }

            @Override
            public void onSwipeLeft() {

                count++;

                if (count >= NOF) //End of question
                    count = NOF;

                if (!STATUS()) {
                    B_Image.setClickable(true);
                    enableButton();
                    if (options != null) {
                        options.clearCheck();
                    }

                } else if (STATUS()) {

                    b_click = true;
                    if (mode == 1) {
                        if (A_value.get(count - 1))
                            options.setBackgroundColor(Color.GREEN);

                        else if (!A_value.get(count - 1))
                            options.setBackgroundColor(Color.RED);

                    }
                    if (mode == 2) {
                        if (Summary.seen) {
                            disableButton();
                            if (A_value.get(count - 1))
                                options.setBackgroundColor(Color.GREEN);

                            else if (!A_value.get(count - 1))
                                options.setBackgroundColor(Color.RED);

                        }
                    }

                }


                DisplayNextQuestion();
                Showprogress();
                pause();

            }


            @Override
            public void onSwipeUp() {
            }


            @Override
            public void onSwipeRight() {

                count--;


                if (count < 1) {
                    count = 1;

                    Toast.makeText(getApplicationContext(), "This is the first question", Toast.LENGTH_LONG).show();
                }


                if (!STATUS()) {
                    B_Image.setClickable(true);
                    enableButton();
                    if (options != null)
                        options.clearCheck();

                } else if (STATUS()) {
                    b_click = true;

                    if (mode == 1) {
                        if (A_value.get(count - 1) )
                            options.setBackgroundColor(Color.GREEN);

                        else if (!A_value.get(count - 1) )
                            options.setBackgroundColor(Color.RED);
                    }

                    if (mode == 2) {

                        if (Summary.seen) {
                            disableButton();
                            if (A_value.get(count - 1))
                                options.setBackgroundColor(Color.GREEN);

                            else if (!A_value.get(count - 1))
                                options.setBackgroundColor(Color.RED);

                        }
                    }
                }

                DisplayPreviousQuestion();
                Showprogress();
                pause();

            }
        });

    }

    /**
     *
     */
    public void disableButton() {

        for (int i = 0; i < options.getChildCount(); i++) {

            options.getChildAt(i).setClickable(false);
        }
    }

    /**
     *
     */
    public void enableButton() {

        for (int i = 0; i < options.getChildCount(); i++) {

            options.getChildAt(i).setClickable(true);
        }
    }

}

